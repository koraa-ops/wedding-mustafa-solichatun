export interface EventDetail {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  mapsEmbedUrl?: string;
  calendarUrl: string;
}

export interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  logo?: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  image: string;
}

export interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  alt: string;
}

export interface WishMessage {
  id: string;
  name: string;
  message: string;
  attendance: 'hadir' | 'tidak_hadir' | 'ragu';
  timestamp: string;
}

export const weddingData = {
  theme: {
    primaryColor: '#c99557', // Champagne Gold
    secondaryColor: '#e8a598', // Rose Gold
    backgroundColor: '#fbf7f4', // Light Fairytale Ivory
  },

  telegram: {
    botToken: '9107083082:AAFZpNGnKPwpDYloQJEXaCTp4o-M8DkiNfM',
    chatId: '1849783527',
  },

  firebase: {
    projectId: '', // Diisi Project ID Firebase (misal: 'mustafa-chaca-wedding')
  },

  groom: {
    nickName: 'Mustafa',
    fullName: 'Mustafa Masykur, S.Pd.',
    description: 'Putra Keempat dari pasangan',
    fatherName: 'Bpk. Ahmad Sulaiman Rajiman',
    motherName: 'Ibu Eni Giyanti',
    origin: 'Bobotsari - Purbalingga',
    instagram: '',
    photo: './images/groom-profile.jpg',
  },

  bride: {
    nickName: 'Chaca',
    fullName: 'Kun Sholichatun, S.S.',
    description: 'Putri Ketiga dari pasangan',
    fatherName: 'Bpk. Salim Imam Miftachul Jamil',
    motherName: 'Ibu Sri Mulatsih',
    origin: 'Jl. Tinggar Jengkol Rt 04/Rw 06 Glempang Maos - Cilacap',
    instagram: '',
    photo: './images/bride-profile.jpg',
  },

  invitationNote: {
    greeting: "Assalamu'alaikum Wr. Wb.",
    intro: "Dengan harapan dan izin Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Walimatul 'Ursy putra-putri kami:",
    closing: "Merupakan kehormatan dan kebahagiaan bagi kami jika Bapak/Ibu/Saudara/i dapat hadir memberikan doa restu kepada kedua mempelai.",
    salamClosing: "Wassalamu'alaikum Warahmatullahi Wabarakatuh",
    hosts: "BAPAK SALIM & IBU SRI",
  },

  quote: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.",
    source: "QS. Ar-Rum: 21",
  },

  weddingDate: '2026-12-17T09:00:00', // Format ISO untuk Countdown
  weddingDateDisplay: 'Kamis, 17 Desember 2026',

  events: [
    {
      id: 'tajdid-akad',
      title: 'At Tajdid \'aqdu Nikah',
      subtitle: 'Akad Nikah',
      date: 'Kamis, 17 Desember 2026',
      time: 'Pukul 09.00 WIB',
      venue: 'Rumah Mempelai Wanita',
      address: 'Jl. Tinggar Jengkol Rt 04/Rw 06 Glempang, Maos - Cilacap',
      mapsUrl: 'https://maps.google.com/?q=Glempang+Maos+Cilacap',
      calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=At+Tajdid+\'aqdu+Nikah+Mustafa+%26+Chaca&dates=20261217T020000Z/20261217T040000Z&details=At+Tajdid+\'aqdu+Nikah+Mustafa+Masykur,+S.Pd.+dan+Kun+Sholichatun,+S.S.+(Chaca)&location=Jl.+Tinggar+Jengkol+Rt+04/Rw+06+Glempang+Maos+-+Cilacap',
    },
    {
      id: 'tasyakuran',
      title: 'Tasyakuran',
      subtitle: 'Walimatul \'Ursy',
      date: 'Rabu - Kamis, 16 - 17 Desember 2026',
      time: 'Pukul 07.00 WIB - Selesai',
      venue: 'Rumah Mempelai Wanita',
      address: 'Jl. Tinggar Jengkol Rt 04/Rw 06 Glempang, Maos - Cilacap',
      mapsUrl: 'https://maps.google.com/?q=Glempang+Maos+Cilacap',
      calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tasyakuran+Pernikahan+Mustafa+%26+Chaca&dates=20261216T000000Z/20261217T120000Z&details=Tasyakuran+Pernikahan+Mustafa+Masykur,+S.Pd.+dan+Kun+Sholichatun,+S.S.+(Chaca)&location=Jl.+Tinggar+Jengkol+Rt+04/Rw+06+Glempang+Maos+-+Cilacap',
    },
    {
      id: 'ngunduh-mantu',
      title: 'Ngunduh Mantu',
      subtitle: 'Kediaman Mempelai Pria',
      date: 'Sabtu - Ahad, 19 - 20 Desember 2026',
      time: 'Pukul 07.00 WIB - Selesai',
      venue: 'Rumah Mempelai Pria',
      address: 'Bobotsari - Purbalingga',
      mapsUrl: 'https://maps.app.goo.gl/ifjpQVgDYVCDC3wQ8',
      calendarUrl: 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Ngunduh+Mantu+Mustafa+%26+Chaca&dates=20261219T000000Z/20261220T120000Z&details=Ngunduh+Mantu+Mustafa+Masykur,+S.Pd.+dan+Kun+Sholichatun,+S.S.+(Chaca)&location=https://maps.app.goo.gl/ifjpQVgDYVCDC3wQ8',
    },
  ] as EventDetail[],

  stories: [
    {
      year: '2022',
      title: 'Awal Pertemuan',
      description: 'Pertemuan yang diiringi rasa saling menghormati dan niat yang baik, menjadi awal mula terjalinnya silaturahmi yang penuh berkah.',
      image: './images/gallery/gallery-1.jpg',
    },
    {
      year: '2024',
      title: 'Menjalin Komitmen',
      description: 'Dengan restu kedua orang tua, kami memantapkan langkah dan saling mendukung untuk menyatukan dua keluarga besar.',
      image: './images/gallery/gallery-3.jpg',
    },
    {
      year: '2025',
      title: 'Ikrar Keseriusan',
      description: 'Sebuah komitmen yang tulus terucap di hadapan keluarga tercinta sebagai wujud kesiapan menyempurnakan separuh agama.',
      image: './images/gallery/gallery-4.jpg',
    },
    {
      year: '2026',
      title: 'Menuju Hari Bahagia',
      description: 'Dengan memohon ridho Allah SWT, kami siap melangkah ke gerbang pernikahan pada hari Kamis, 17 Desember 2026.',
      image: './images/gallery/gallery-2.jpg',
    },
  ] as StoryMilestone[],

  gallery: [
    {
      id: 1,
      url: './images/gallery/gallery-1.jpg',
      caption: 'Kebersamaan hangat dan senyuman di bawah naungan ilmu dan berkah',
      alt: 'Mustafa & Kun Sholichatun - Foto 1',
    },
    {
      id: 2,
      url: './images/gallery/gallery-2.jpg',
      caption: 'Menapaki ikatan suci di pelataran masjid dengan niat tulus',
      alt: 'Mustafa & Kun Sholichatun - Foto 2',
    },
    {
      id: 3,
      url: './images/gallery/gallery-3.jpg',
      caption: 'Menatap masa depan bersama dengan penuh keyakinan dan harapan',
      alt: 'Mustafa & Kun Sholichatun - Foto 3',
    },
    {
      id: 4,
      url: './images/gallery/gallery-4.jpg',
      caption: 'Keceriaan hangat dan bahagia menyongsong ikrar suci pernikahan',
      alt: 'Mustafa & Kun Sholichatun - Foto 4',
    },
  ] as GalleryPhoto[],

  bankAccounts: [
    {
      bankName: 'Bank Central Asia (BCA)',
      accountNumber: '8691524310',
      accountHolder: 'Mustafa Masykur',
      logo: 'BCA',
    },
    {
      bankName: 'Bank Mandiri',
      accountNumber: '1370019283741',
      accountHolder: 'Kun Sholichatun',
      logo: 'MANDIRI',
    },
  ] as BankAccount[],

  physicalGiftAddress: {
    recipient: 'Kun Sholichatun & Mustafa Masykur',
    phone: '0812-3456-7890',
    address: 'Jl. Tinggar Jengkol Rt 04/Rw 06 Glempang, Maos, Cilacap, Jawa Tengah',
  },

  music: {
    url: './audio/audio.mp3',
    title: 'Spesial Song - Mustafa & Chaca',
  },

  initialWishes: [
    {
      id: '1',
      name: 'Keluarga Besar Glempang Maos',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Selamat menempuh hidup baru Mustafa dan Kun Sholichatun! Semoga sakinah mawaddah warahmah.',
      attendance: 'hadir',
      timestamp: '2 jam yang lalu',
    },
    {
      id: '2',
      name: 'Sahabat Purbalingga & Cilacap',
      message: 'Alhamdulillah selamat ya Mustafa Masykur & Kun Sholichatun! Semoga lancar sampai hari H dan selalu dilimpahi keberkahan.',
      attendance: 'hadir',
      timestamp: '4 jam yang lalu',
    },
    {
      id: '3',
      name: 'Keluarga Besar Bobotsari',
      message: 'Selamat untuk kedua mempelai. Semoga menjadi keluarga yang harmonis, penuh cinta, dan barokah dunia akhirat.',
      attendance: 'hadir',
      timestamp: 'Kemarin',
    },
  ] as WishMessage[],
};
