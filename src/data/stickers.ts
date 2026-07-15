export type StickerRarity = 'comum' | 'rara' | 'brilhante'

export interface Sticker {
  id: number
  name: string
  team: string
  image: string
  rarity: StickerRarity
  collected: boolean
  favorite?: boolean
  collected_at?: string | null
}

export const stickers: Sticker[] = [
  {
    id: 1,
    name: 'Neymar Jr',
    team: 'Brasil',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARg2gTMEMXBO-UGS-j-DafIjxIMbaUMPbhspvxZsCSRJHQv4rMu9qxHk&s=10',
    rarity: 'rara',
    collected: false
  },
  {
    id: 2,
    name: 'Vinicius Jr',
    team: 'Brasil',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMy-SKDeG_rjsC73mHI_f0TCWFBA6pZhHu1Ih-glA8sbi7ES2Y9XkRxTV&s=10',
    rarity: 'brilhante',
    collected: false
  },
  {
    id: 3,
    name: 'Casemiro',
    team: 'Brasil',
    image: 'https://http2.mlstatic.com/D_NQ_NP_898146-MLB110353663622_052026-O.webp',
    rarity: 'comum',
    collected: false
  },
  {
    id: 4,
    name: 'Alisson',
    team: 'Brasil',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsh31Nr1IUwNP0XHwmwi28Z6JKI4v4lRiSILVzrC8UgkAlseTdE5LE_xM&s=10',
    rarity: 'comum',
    collected: false
  },
  {
    id: 5,
    name: 'Messi',
    team: 'Argentina',
    image: 'https://extrasticker.com.br/wp-content/uploads/2026/06/messi-OURO.png',
    rarity: 'brilhante',
    collected: false
  },
  {
    id: 6,
    name: 'Di Maria',
    team: 'Argentina',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJFxJ-G8CLUw7nJ-G58PIPzmbb9D2VF2T-zkxce70mG4VZGYxkDce80GN0&s=10',
    rarity: 'comum',
    collected: false
  },
  {
    id: 7,
    name: 'Julian Alvarez',
    team: 'Argentina',
    image: 'https://img.mypcards.com/cdn-cgi/image/h=425,fit=contain,f=auto/img/19/2517/fwc26_fwc_arg19/fwc26_fwc_arg19_en.jpg',
    rarity: 'rara',
    collected: false
  },
  {
    id: 8,
    name: 'Dibu Martinez',
    team: 'Argentina',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvM1b3OfnJVmEqcfs5vvkFqK97ltUAbJgcv1GCz4RPo_sZ70UcCiDqi64&s=10',
    rarity: 'comum',
    collected: false
  },
  {
    id: 9,
    name: 'Mbappe',
    team: 'Franca',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQl336M9zLHD_V2Spm10jr8zbqRBT0_e97QPVFMZeIjg&s',
    rarity: 'brilhante',
    collected: false
  },
  {
    id: 10,
    name: 'Griezmann',
    team: 'Franca',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGxDKwkwcjqS4xvJzGHUJdcAHVtWfdpQXOkj2WmhpHl_SrNo-2WD3TlLhh&s=10',
    rarity: 'rara',
    collected: false
  },
  {
    id: 11,
    name: 'Barcola',
    team: 'Franca',
    image: 'https://down-br.img.susercontent.com/file/br-11134207-820lh-mnt3p4dxg26cba',
    rarity: 'comum',
    collected: false
  },
  {
    id: 12,
    name: 'Camavinga',
    team: 'Franca',
    image: 'https://conteudo.imguol.com.br/c/esporte/58/2026/05/14/figurinha-de-camavinga-que-esta-fora-da-copa-1778793105684_v2_700x974.png',
    rarity: 'comum',
    collected: false
  },
  {
    id: 13,
    name: 'Cristiano Ronaldo',
    team: 'Portugal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGiXTeQKwLfE00gdqm5iwDa5qCt_zfGPwMKb_kbVgTyQ&s',
    rarity: 'brilhante',
    collected: false
  },
  {
    id: 14,
    name: 'Nuno Mendes',
    team: 'Portugal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYPyudJU5o0u1QOfNbDDedJVd8eO_pQIC687126wk1gTQepEjv1eTc5SAp&s=10',
    rarity: 'rara',
    collected: false
  },
  {
    id: 15,
    name: 'Diogo Costa',
    team: 'Portugal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUt2O7teV732zojtJUcyOaanGaVgWqw3LPqd8UV3HAQDfWubCSCBDl_Rg&s=10',
    rarity: 'comum',
    collected: false
  },
  {
    id: 16,
    name: 'Joao Neves',
    team: 'Portugal',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuyXuUtF0yChHBolyMUVAth0RB-UhrER2xZih4tSRJeMH2yjDMmxsZgdU&s=10',
    rarity: 'comum',
    collected: false
  },
  {
    id: 17,
    name: 'Harry Kane',
    team: 'Inglaterra',
    image: 'https://img.mypcards.com/cdn-cgi/image/h=425,fit=contain,f=auto/img/19/2517/fwc26_fwc_eng18/fwc26_fwc_eng18_en.jpg',
    rarity: 'rara',
    collected: false
  },
  {
    id: 18,
    name: 'Bellingham',
    team: 'Inglaterra',
    image: 'https://www.quadrodemedalhas.com/images/copa-do-mundo/figurinha-copa-mundo-2022-inglaterra-jude-bellingham-extra.jpg',
    rarity: 'brilhante',
    collected: false
  }
]
