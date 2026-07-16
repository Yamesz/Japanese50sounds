// kana.js - Japanese Kana Dataset
// Contains Seion (Gojuon), Dakuon, Handakuon, and Yoon with alternate Romaji spellings.

const KANA_DATA = [
  // --- SEION (清音 - Gojuon) ---
  // A-Row
  { id: 'h_a', hiragana: 'あ', katakana: 'ア', romaji: 'a', type: 'seion', row: 'a', vocab: { word: '朝', reading: 'あさ', romaji: 'asa', meaning: '早上', keyword: 'morning' } },
  { id: 'h_i', hiragana: 'い', katakana: 'イ', romaji: 'i', type: 'seion', row: 'a', vocab: { word: '犬', reading: 'いぬ', romaji: 'inu', meaning: '狗', keyword: 'dog' } },
  { id: 'h_u', hiragana: 'う', katakana: 'ウ', romaji: 'u', type: 'seion', row: 'a', vocab: { word: '海', reading: 'うみ', romaji: 'umi', meaning: '海', keyword: 'sea' } },
  { id: 'h_e', hiragana: 'え', katakana: 'エ', romaji: 'e', type: 'seion', row: 'a', vocab: { word: '駅', reading: 'えき', romaji: 'eki', meaning: '車站', keyword: 'station' } },
  { id: 'h_o', hiragana: 'お', katakana: 'オ', romaji: 'o', type: 'seion', row: 'a', vocab: { word: 'お茶', reading: 'おちゃ', romaji: 'ocha', meaning: '綠茶', keyword: 'tea' } },

  // KA-Row
  { id: 'h_ka', hiragana: 'か', katakana: 'カ', romaji: 'ka', type: 'seion', row: 'ka', vocab: { word: '傘', reading: 'かさ', romaji: 'kasa', meaning: '雨傘', keyword: 'umbrella' } },
  { id: 'h_ki', hiragana: 'き', katakana: 'キ', romaji: 'ki', type: 'seion', row: 'ka', vocab: { word: '木', reading: 'き', romaji: 'ki', meaning: '樹木', keyword: 'tree' } },
  { id: 'h_ku', hiragana: 'く', katakana: 'ク', romaji: 'ku', type: 'seion', row: 'ka', vocab: { word: '車', reading: 'くるま', romaji: 'kuruma', meaning: '汽車', keyword: 'car' } },
  { id: 'h_ke', hiragana: 'け', katakana: 'ケ', romaji: 'ke', type: 'seion', row: 'ka', vocab: { word: '携帯', reading: 'けいたい', romaji: 'keitai', meaning: '手機', keyword: 'phone' } },
  { id: 'h_ko', hiragana: 'こ', katakana: 'コ', romaji: 'ko', type: 'seion', row: 'ka', vocab: { word: '子供', reading: 'こども', romaji: 'kodomo', meaning: '孩子', keyword: 'child' } },

  // SA-Row
  { id: 'h_sa', hiragana: 'さ', katakana: 'サ', romaji: 'sa', type: 'seion', row: 'sa', vocab: { word: '魚', reading: 'さかな', romaji: 'sakana', meaning: '魚', keyword: 'fish' } },
  { id: 'h_shi', hiragana: 'し', katakana: 'シ', romaji: 'shi', alternatives: ['si'], type: 'seion', row: 'sa', vocab: { word: '塩', reading: 'しお', romaji: 'shio', meaning: '食鹽', keyword: 'salt' } },
  { id: 'h_su', hiragana: 'す', katakana: 'ス', romaji: 'su', type: 'seion', row: 'sa', vocab: { word: '寿司', reading: 'すし', romaji: 'sushi', meaning: '壽司', keyword: 'sushi' } },
  { id: 'h_se', hiragana: 'せ', katakana: 'セ', romaji: 'se', type: 'seion', row: 'sa', vocab: { word: '先生', reading: 'せんせい', romaji: 'sensei', meaning: '老師', keyword: 'teacher' } },
  { id: 'h_so', hiragana: 'そ', katakana: 'ソ', romaji: 'so', type: 'seion', row: 'sa', vocab: { word: '空', reading: 'そら', romaji: 'sora', meaning: '天空', keyword: 'sky' } },

  // TA-Row
  { id: 'h_ta', hiragana: 'た', katakana: 'タ', romaji: 'ta', type: 'seion', row: 'ta', vocab: { word: '卵', reading: 'たまご', romaji: 'tamago', meaning: '雞蛋', keyword: 'egg' } },
  { id: 'h_chi', hiragana: 'ち', katakana: 'チ', romaji: 'chi', alternatives: ['ti'], type: 'seion', row: 'ta', vocab: { word: '地図', reading: 'ちず', romaji: 'chizu', meaning: '地圖', keyword: 'map' } },
  { id: 'h_tsu', hiragana: 'つ', katakana: 'ツ', romaji: 'tsu', alternatives: ['tu'], type: 'seion', row: 'ta', vocab: { word: '机', reading: 'つくえ', romaji: 'tsukue', meaning: '桌子', keyword: 'desk' } },
  { id: 'h_te', hiragana: 'て', katakana: 'テ', romaji: 'te', type: 'seion', row: 'ta', vocab: { word: '手紙', reading: 'てがみ', romaji: 'tegami', meaning: '信件', keyword: 'letter' } },
  { id: 'h_to', hiragana: 'と', katakana: 'ト', romaji: 'to', type: 'seion', row: 'ta', vocab: { word: '友達', reading: 'ともだち', romaji: 'tomodachi', meaning: '朋友', keyword: 'friend' } },

  // NA-Row
  { id: 'h_na', hiragana: 'な', katakana: 'ナ', romaji: 'na', type: 'seion', row: 'na', vocab: { word: '夏', reading: 'なつ', romaji: 'natsu', meaning: '夏天', keyword: 'summer' } },
  { id: 'h_ni', hiragana: 'に', katakana: 'ニ', romaji: 'ni', type: 'seion', row: 'na', vocab: { word: '肉', reading: 'にく', romaji: 'niku', meaning: '肉類', keyword: 'meat' } },
  { id: 'h_nu', hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu', type: 'seion', row: 'na', vocab: { word: 'ぬいぐるみ', reading: 'ぬいぐるみ', romaji: 'nuigurumi', meaning: '玩偶', keyword: 'plush' } },
  { id: 'h_ne', hiragana: 'ね', katakana: 'ネ', romaji: 'ne', type: 'seion', row: 'na', vocab: { word: '猫', reading: 'ねこ', romaji: 'neko', meaning: '貓', keyword: 'cat' } },
  { id: 'h_no', hiragana: 'の', katakana: 'ノ', romaji: 'no', type: 'seion', row: 'na', vocab: { word: '飲み物', reading: 'のみもの', romaji: 'nomimono', meaning: '飲料', keyword: 'drink' } },

  // HA-Row
  { id: 'h_ha', hiragana: 'は', katakana: 'ハ', romaji: 'ha', type: 'seion', row: 'ha', vocab: { word: '花', reading: 'はな', romaji: 'hana', meaning: '花朵', keyword: 'flower' } },
  { id: 'h_hi', hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi', type: 'seion', row: 'ha', vocab: { word: '光', reading: 'ひかり', romaji: 'hikari', meaning: '光線', keyword: 'light' } },
  { id: 'h_fu', hiragana: 'ふ', katakana: 'フ', romaji: 'fu', alternatives: ['hu'], type: 'seion', row: 'ha', vocab: { word: '船', reading: 'ふね', romaji: 'fune', meaning: '船隻', keyword: 'ship' } },
  { id: 'h_he', hiragana: 'へ', katakana: 'ヘ', romaji: 'he', type: 'seion', row: 'ha', vocab: { word: '部屋', reading: 'へや', romaji: 'heya', meaning: '房間', keyword: 'room' } },
  { id: 'h_ho', hiragana: 'ほ', katakana: 'ホ', romaji: 'ho', type: 'seion', row: 'ha', vocab: { word: '本', reading: 'ほん', romaji: 'hon', meaning: '書籍', keyword: 'book' } },

  // MA-Row
  { id: 'h_ma', hiragana: 'ま', katakana: 'マ', romaji: 'ma', type: 'seion', row: 'ma', vocab: { word: '窓', reading: 'まど', romaji: 'mado', meaning: '窗戶', keyword: 'window' } },
  { id: 'h_mi', hiragana: 'み', katakana: 'ミ', romaji: 'mi', type: 'seion', row: 'ma', vocab: { word: '水', reading: 'みず', romaji: 'mizu', meaning: '白開水', keyword: 'water' } },
  { id: 'h_mu', hiragana: 'む', katakana: 'ム', romaji: 'mu', type: 'seion', row: 'ma', vocab: { word: '虫', reading: 'むし', romaji: 'mushi', meaning: '昆蟲', keyword: 'insect' } },
  { id: 'h_me', hiragana: 'め', katakana: 'メ', romaji: 'me', type: 'seion', row: 'ma', vocab: { word: '眼鏡', reading: 'めがね', romaji: 'megane', meaning: '眼鏡', keyword: 'glasses' } },
  { id: 'h_mo', hiragana: 'も', katakana: 'モ', romaji: 'mo', type: 'seion', row: 'ma', vocab: { word: '森', reading: 'もり', romaji: 'mori', meaning: '森林', keyword: 'forest' } },

  // YA-Row
  { id: 'h_ya', hiragana: 'や', katakana: 'ヤ', romaji: 'ya', type: 'seion', row: 'ya', vocab: { word: '山', reading: 'やま', romaji: 'yama', meaning: '高山', keyword: 'mountain' } },
  { id: 'h_yu', hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu', type: 'seion', row: 'ya', vocab: { word: '雪', reading: 'ゆき', romaji: 'yuki', meaning: '下雪', keyword: 'snow' } },
  { id: 'h_yo', hiragana: 'よ', katakana: 'ヨ', romaji: 'yo', type: 'seion', row: 'ya', vocab: { word: '夜', reading: 'よる', romaji: 'yoru', meaning: '夜晚', keyword: 'night' } },

  // RA-Row
  { id: 'h_ra', hiragana: 'ら', katakana: 'ラ', romaji: 'ra', type: 'seion', row: 'ra', vocab: { word: '駱駝', reading: 'らくだ', romaji: 'rakuda', meaning: '駱駝', keyword: 'camel' } },
  { id: 'h_ri', hiragana: 'り', katakana: 'リ', romaji: 'ri', type: 'seion', row: 'ra', vocab: { word: '林檎', reading: 'りんご', romaji: 'ringo', meaning: '蘋果', keyword: 'apple' } },
  { id: 'h_ru', hiragana: 'る', katakana: 'ル', romaji: 'ru', type: 'seion', row: 'ra', vocab: { word: '留守', reading: 'るす', romaji: 'rusu', meaning: '不在家', keyword: 'absent' } },
  { id: 'h_re', hiragana: 'れ', katakana: 'レ', romaji: 're', type: 'seion', row: 'ra', vocab: { word: '冷蔵庫', reading: 'れいぞうこ', romaji: 'reizouko', meaning: '冰箱', keyword: 'refrigerator' } },
  { id: 'h_ro', hiragana: 'ろ', katakana: 'ロ', romaji: 'ro', type: 'seion', row: 'ra', vocab: { word: '蝋燭', reading: 'ろうそく', romaji: 'rousoku', meaning: '蠟燭', keyword: 'candle' } },

  // WA-Row
  { id: 'h_wa', hiragana: 'わ', katakana: 'ワ', romaji: 'wa', type: 'seion', row: 'wa', vocab: { word: '鰐', reading: 'わに', romaji: 'wani', meaning: '鱷魚', keyword: 'alligator' } },
  { id: 'h_wo', hiragana: 'を', katakana: 'ヲ', romaji: 'wo', alternatives: ['o'], type: 'seion', row: 'wa', vocab: { word: '本を読む', reading: 'ほんをよむ', romaji: 'hon o yomu', meaning: '讀書', keyword: 'read' } },
  { id: 'h_n', hiragana: 'ん', katakana: 'ン', romaji: 'n', alternatives: ['nn'], type: 'seion', row: 'wa', vocab: { word: '新幹線', reading: 'しんかんせん', romaji: 'shinkansen', meaning: '新幹線', keyword: 'train' } },

  // --- DAKUON (濁音) ---
  // GA-Row
  { id: 'h_ga', hiragana: 'が', katakana: 'ガ', romaji: 'ga', type: 'dakuon', row: 'ga' },
  { id: 'h_gi', hiragana: 'ぎ', katakana: 'ギ', romaji: 'gi', type: 'dakuon', row: 'ga' },
  { id: 'h_gu', hiragana: 'ぐ', katakana: 'グ', romaji: 'gu', type: 'dakuon', row: 'ga' },
  { id: 'h_ge', hiragana: 'げ', katakana: 'ゲ', romaji: 'ge', type: 'dakuon', row: 'ga' },
  { id: 'h_go', hiragana: 'ご', katakana: 'ゴ', romaji: 'go', type: 'dakuon', row: 'ga' },

  // ZA-Row
  { id: 'h_za', hiragana: 'ざ', katakana: 'ザ', romaji: 'za', type: 'dakuon', row: 'za' },
  { id: 'h_zi', hiragana: 'じ', katakana: 'ジ', romaji: 'ji', alternatives: ['zi'], type: 'dakuon', row: 'za' },
  { id: 'h_zu', hiragana: 'ず', katakana: 'ズ', romaji: 'zu', type: 'dakuon', row: 'za' },
  { id: 'h_ze', hiragana: 'ぜ', katakana: 'ゼ', romaji: 'ze', type: 'dakuon', row: 'za' },
  { id: 'h_zo', hiragana: 'ぞ', katakana: 'ゾ', romaji: 'zo', type: 'dakuon', row: 'za' },

  // DA-Row
  { id: 'h_da', hiragana: 'だ', katakana: 'ダ', romaji: 'da', type: 'dakuon', row: 'da' },
  { id: 'h_di', hiragana: 'ぢ', katakana: 'ヂ', romaji: 'ji', alternatives: ['di', 'zi'], type: 'dakuon', row: 'da' },
  { id: 'h_du', hiragana: 'づ', katakana: 'ヅ', romaji: 'zu', alternatives: ['du'], type: 'dakuon', row: 'da' },
  { id: 'h_de', hiragana: 'で', katakana: 'デ', romaji: 'de', type: 'dakuon', row: 'da' },
  { id: 'h_do', hiragana: 'ど', katakana: 'ド', romaji: 'do', type: 'dakuon', row: 'da' },

  // BA-Row
  { id: 'h_ba', hiragana: 'ば', katakana: 'バ', romaji: 'ba', type: 'dakuon', row: 'ba' },
  { id: 'h_bi', hiragana: 'び', katakana: 'ビ', romaji: 'bi', type: 'dakuon', row: 'ba' },
  { id: 'h_bu', hiragana: 'ぶ', katakana: 'ブ', romaji: 'bu', type: 'dakuon', row: 'ba' },
  { id: 'h_be', hiragana: 'べ', katakana: 'ベ', romaji: 'be', type: 'dakuon', row: 'ba' },
  { id: 'h_bo', hiragana: 'ぼ', katakana: 'ボ', romaji: 'bo', type: 'dakuon', row: 'ba' },

  // --- HANDAKUON (半濁音) ---
  // PA-Row
  { id: 'h_pa', hiragana: 'ぱ', katakana: 'パ', romaji: 'pa', type: 'handakuon', row: 'pa' },
  { id: 'h_pi', hiragana: 'ぴ', katakana: 'ピ', romaji: 'pi', type: 'handakuon', row: 'pa' },
  { id: 'h_pu', hiragana: 'ぷ', katakana: 'プ', romaji: 'pu', type: 'handakuon', row: 'pa' },
  { id: 'h_pe', hiragana: 'ぺ', katakana: 'ペ', romaji: 'pe', type: 'handakuon', row: 'pa' },
  { id: 'h_po', hiragana: 'ぽ', katakana: 'ポ', romaji: 'po', type: 'handakuon', row: 'pa' },

  // --- YOON (拗音 - Contracted sounds) ---
  // K-Yoon
  { id: 'h_kya', hiragana: 'きゃ', katakana: 'キャ', romaji: 'kya', type: 'yoon', row: 'ya' },
  { id: 'h_kyu', hiragana: 'きゅ', katakana: 'キュ', romaji: 'kyu', type: 'yoon', row: 'ya' },
  { id: 'h_kyo', hiragana: 'きょ', katakana: 'キョ', romaji: 'kyo', type: 'yoon', row: 'ya' },

  // S-Yoon (sha, shu, sho)
  { id: 'h_sha', hiragana: 'しゃ', katakana: 'シャ', romaji: 'sha', alternatives: ['sya'], type: 'yoon', row: 'ya' },
  { id: 'h_shu', hiragana: 'しゅ', katakana: 'シュ', romaji: 'shu', alternatives: ['syu'], type: 'yoon', row: 'ya' },
  { id: 'h_sho', hiragana: 'しょ', katakana: 'ショ', romaji: 'sho', alternatives: ['syo'], type: 'yoon', row: 'ya' },

  // T-Yoon (cha, chu, cho)
  { id: 'h_cha', hiragana: 'ちゃ', katakana: 'チャ', romaji: 'cha', alternatives: ['tya'], type: 'yoon', row: 'ya' },
  { id: 'h_chu', hiragana: 'ちゅ', katakana: 'チュ', romaji: 'chu', alternatives: ['tyu'], type: 'yoon', row: 'ya' },
  { id: 'h_cho', hiragana: 'ちょ', katakana: 'チョ', romaji: 'cho', alternatives: ['tyo'], type: 'yoon', row: 'ya' },

  // N-Yoon
  { id: 'h_nya', hiragana: 'にゃ', katakana: 'ニャ', romaji: 'nya', type: 'yoon', row: 'ya' },
  { id: 'h_nyu', hiragana: 'にゅ', katakana: 'ニュ', romaji: 'nyu', type: 'yoon', row: 'ya' },
  { id: 'h_nyo', hiragana: 'にょ', katakana: 'ニョ', romaji: 'nyo', type: 'yoon', row: 'ya' },

  // H-Yoon
  { id: 'h_hya', hiragana: 'ひゃ', katakana: 'ヒャ', romaji: 'hya', type: 'yoon', row: 'ya' },
  { id: 'h_hyu', hiragana: 'ひゅ', katakana: 'ヒュ', romaji: 'hyu', type: 'yoon', row: 'ya' },
  { id: 'h_hyo', hiragana: 'ひょ', katakana: 'ヒョ', romaji: 'hyo', type: 'yoon', row: 'ya' },

  // M-Yoon
  { id: 'h_mya', hiragana: 'みゃ', katakana: 'ミャ', romaji: 'mya', type: 'yoon', row: 'ya' },
  { id: 'h_myu', hiragana: 'みゅ', katakana: 'ミュ', romaji: 'myu', type: 'yoon', row: 'ya' },
  { id: 'h_myo', hiragana: 'みょ', katakana: 'ミョ', romaji: 'myo', type: 'yoon', row: 'ya' },

  // R-Yoon
  { id: 'h_rya', hiragana: 'りゃ', katakana: 'リャ', romaji: 'rya', type: 'yoon', row: 'ya' },
  { id: 'h_ryu', hiragana: 'りゅ', katakana: 'リュ', romaji: 'ryu', type: 'yoon', row: 'ya' },
  { id: 'h_ryo', hiragana: 'りょ', katakana: 'リョ', romaji: 'ryo', type: 'yoon', row: 'ya' },

  // G-Yoon (gya, gyu, gyo)
  { id: 'h_gya', hiragana: 'ぎゃ', katakana: 'ギャ', romaji: 'gya', type: 'yoon', row: 'ya' },
  { id: 'h_gyu', hiragana: 'ぎゅ', katakana: 'ギュ', romaji: 'gyu', type: 'yoon', row: 'ya' },
  { id: 'h_gyo', hiragana: 'ぎょ', katakana: 'ギョ', romaji: 'gyo', type: 'yoon', row: 'ya' },

  // Z-Yoon (ja, ju, jo)
  { id: 'h_ja', hiragana: 'じゃ', katakana: 'ジャ', romaji: 'ja', alternatives: ['zya'], type: 'yoon', row: 'ya' },
  { id: 'h_ju', hiragana: 'じゅ', katakana: 'ジュ', romaji: 'ju', alternatives: ['zyu'], type: 'yoon', row: 'ya' },
  { id: 'h_jo', hiragana: 'じょ', katakana: 'ジョ', romaji: 'jo', alternatives: ['zyo'], type: 'yoon', row: 'ya' },

  // B-Yoon
  { id: 'h_bya', hiragana: 'びゃ', katakana: 'ビャ', romaji: 'bya', type: 'yoon', row: 'ya' },
  { id: 'h_byu', hiragana: 'びゅ', katakana: 'ビュ', romaji: 'byu', type: 'yoon', row: 'ya' },
  { id: 'h_byo', hiragana: 'びょ', katakana: 'ビョ', romaji: 'byo', type: 'yoon', row: 'ya' },

  // P-Yoon
  { id: 'h_pya', hiragana: 'ぴゃ', katakana: 'ピャ', romaji: 'pya', type: 'yoon', row: 'ya' },
  { id: 'h_pyu', hiragana: 'ぴゅ', katakana: 'ピュ', romaji: 'pyu', type: 'yoon', row: 'ya' },
  { id: 'h_pyo', hiragana: 'ぴょ', katakana: 'ピョ', romaji: 'pyo', type: 'yoon', row: 'ya' }
];



// Group mapping helper to get row labels in Chinese
const ROW_LABELS = {
  a: 'あ行',
  ka: 'か行',
  sa: 'さ行',
  ta: 'た行',
  na: 'な行',
  ha: 'は行',
  ma: 'ま行',
  ya: 'や行',
  ra: 'ら行',
  wa: 'わ行',
  ga: 'が行',
  za: 'ざ行',
  da: 'だ行',
  ba: 'ば行',
  pa: 'ぱ行'
};

window.KANA_DATA = KANA_DATA;
window.ROW_LABELS = ROW_LABELS;
