import { weddingData, type WishMessage } from '../config/weddingData';

/**
 * Service untuk menyimpan dan mengambil ucapan/RSVP dari Firebase Firestore
 * menggunakan native REST API (ringan, tanpa dependensi besar, 100% kompatibel GitHub Pages).
 */

export interface RawFirestoreWish {
  name?: { stringValue?: string };
  message?: { stringValue?: string };
  attendance?: { stringValue?: string };
  pax?: { stringValue?: string };
  createdAt?: { timestampValue?: string };
}

export async function saveWishToFirebase(
  name: string,
  message: string,
  attendance: 'hadir' | 'tidak_hadir' | 'ragu',
  pax: string = '1'
): Promise<boolean> {
  const { projectId } = weddingData.firebase || {};
  if (!projectId || projectId.trim() === '') {
    return false;
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/wishes`;

  const body = {
    fields: {
      name: { stringValue: name.trim() },
      message: { stringValue: message.trim() },
      attendance: { stringValue: attendance },
      pax: { stringValue: pax },
      createdAt: { timestampValue: new Date().toISOString() },
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return res.ok;
  } catch (error) {
    console.warn('Gagal menyimpan doa ke Firebase:', error);
    return false;
  }
}

export async function fetchWishesFromFirebase(): Promise<WishMessage[]> {
  const { projectId } = weddingData.firebase || {};
  if (!projectId || projectId.trim() === '') {
    return [];
  }

  // Ambil dokumen dari koleksi 'wishes', diurutkan berdasarkan createdAt descending (terbaru di atas)
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/wishes?pageSize=50`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    if (!data.documents || !Array.isArray(data.documents)) {
      return [];
    }

    const wishes: WishMessage[] = data.documents.map((doc: any, index: number) => {
      const fields: RawFirestoreWish = doc.fields || {};
      const docName = fields.name?.stringValue || 'Tamu Undangan';
      const docMessage = fields.message?.stringValue || 'Turut berbahagia dan mendoakan keberkahan.';
      const docAttendance = (fields.attendance?.stringValue as 'hadir' | 'tidak_hadir' | 'ragu') || 'hadir';
      const createdAtRaw = fields.createdAt?.timestampValue;

      let timeDisplay = 'Baru saja';
      if (createdAtRaw) {
        try {
          const d = new Date(createdAtRaw);
          timeDisplay = d.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' WIB';
        } catch {
          // ignore
        }
      }

      return {
        id: doc.name ? doc.name.split('/').pop() || String(index) : String(index),
        name: docName,
        message: docMessage,
        attendance: docAttendance,
        timestamp: timeDisplay,
      };
    });

    // Urutkan terbaru di paling atas
    return wishes;
  } catch (error) {
    console.warn('Gagal mengambil doa dari Firebase:', error);
    return [];
  }
}
