import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

import { stickers } from "@/data/stickers";

const dbName = "appdata";
let db: SQLiteDBConnection | null = null;
let initialized = false;
const sqliteconnection = new SQLiteConnection(CapacitorSQLite);

export interface AlbumStats {
  total: number;
  collected: number;
  pending: number;
  rareCollected: number;
  shinyCollected: number;
  favoriteCount: number;
  score: number;
  progress: number;
}

export interface Achievement {
  id: number;
  nome: string;
  descricao: string;
  icone: string;
  desbloqueada: boolean;
  data_desbloqueio: string | null;
}

const achievementCatalog = [
  {
    id: 1,
    nome: "Primeira Figurinha",
    descricao: "Desbloquear ao coletar a primeira figurinha.",
    icone: "trophy-outline",
  },
  {
    id: 2,
    nome: "Iniciante",
    descricao: "Coletar 10 figurinhas.",
    icone: "ribbon-outline",
  },
  {
    id: 3,
    nome: "Colecionador",
    descricao: "Coletar 25 figurinhas.",
    icone: "albums-outline",
  },
  {
    id: 4,
    nome: "Album em Construção",
    descricao: "Coletar 50 figurinhas.",
    icone: "construct-outline",
  },
  {
    id: 5,
    nome: "Caçador de Raras",
    descricao: "Coletar 5 figurinhas raras.",
    icone: "diamond-outline",
  },
  {
    id: 6,
    nome: "Especialista em Raras",
    descricao: "Coletar 15 figurinhas raras.",
    icone: "sparkles-outline",
  },
  {
    id: 7,
    nome: "Brilho Inicial",
    descricao: "Coletar 3 figurinhas brilhantes.",
    icone: "star-outline",
  },
  {
    id: 8,
    nome: "Mestre das Brilhantes",
    descricao: "Coletar 10 figurinhas brilhantes.",
    icone: "star-half-outline",
  },
  {
    id: 9,
    nome: "Album Quase Completo",
    descricao: "Completar 80% do album.",
    icone: "medal-outline",
  },
  {
    id: 10,
    nome: "Campeão da Copa",
    descricao: "Completar 100% do album.",
    icone: "football-outline",
  },
  {
    id: 11,
    nome: "Brasil Completo",
    descricao: "Completar a coleção do Brasil.",
    icone: "flag-outline",
    team: "Brasil",
  },
  {
    id: 12,
    nome: "Argentina Completa",
    descricao: "Completar a coleção da Argentina.",
    icone: "flag-outline",
    team: "Argentina",
  },
  {
    id: 13,
    nome: "Franca Completa",
    descricao: "Completar a coleção da Franca.",
    icone: "flag-outline",
    team: "Franca",
  },
  {
    id: 14,
    nome: "Portugal Completo",
    descricao: "Completar a coleção de Portugal.",
    icone: "flag-outline",
    team: "Portugal",
  },
  {
    id: 15,
    nome: "Inglaterra Completa",
    descricao: "Completar a coleção da Inglaterra.",
    icone: "flag-outline",
    team: "Inglaterra",
  },
];

async function executeSafely(query: string) {
  try {
    await getDb().execute(query);
  } catch (error) {
    console.warn("Migração ignorada", error);
  }
}

async function ensureDatabase() {
  if (initialized && db) {
    return;
  }

  if (!db) {
    db = await sqliteconnection.createConnection(
      dbName,
      false,
      "no-encryption",
      1,
      false,
    );
  }

  await db.open();

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT,
      senha TEXT NOT NULL
    );
  `);

  await executeSafely("ALTER TABLE usuarios ADD COLUMN email TEXT;");
  await executeSafely("ALTER TABLE usuarios ADD COLUMN telefone TEXT;");
  await executeSafely("ALTER TABLE usuarios ADD COLUMN senha TEXT;");
  await migrateUsuariosSchema();

  await executeSafely("ALTER TABLE sticker_status ADD COLUMN favorite INTEGER NOT NULL DEFAULT 0;");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS stickers (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      team TEXT NOT NULL,
      image TEXT NOT NULL,
      rarity TEXT NOT NULL
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS sticker_status (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      sticker_id INTEGER NOT NULL,
      collected INTEGER NOT NULL DEFAULT 0,
      favorite INTEGER NOT NULL DEFAULT 0,
      collected_at TEXT,
      UNIQUE(user_id, sticker_id),
      FOREIGN KEY(user_id) REFERENCES usuarios(id),
      FOREIGN KEY(sticker_id) REFERENCES stickers(id)
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INTEGER PRIMARY KEY,
      nome TEXT NOT NULL,
      descricao TEXT NOT NULL,
      icone TEXT NOT NULL,
      desbloqueada INTEGER NOT NULL DEFAULT 0,
      data_desbloqueio TEXT
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS user_achievements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      achievement_id INTEGER NOT NULL,
      data_desbloqueio TEXT NOT NULL,
      UNIQUE(user_id, achievement_id),
      FOREIGN KEY(user_id) REFERENCES usuarios(id),
      FOREIGN KEY(achievement_id) REFERENCES achievements(id)
    );
  `);

  await seedStickers();
  await seedAchievements();

  // Seed a default test account (if not already present)
  try {
    await getDb().run(
      `
        INSERT OR IGNORE INTO usuarios (nome, email, telefone, senha)
        VALUES (?, ?, ?, ?)
      `,
      ['Julio', 'julio@gmail.com', null, '14042009'],
    );
  } catch (e) {
    console.warn('Não foi possível inserir usuário de teste', e);
  }

  initialized = true;
}

function getDb() {
  if (!db) {
    throw new Error("Banco de dados ainda não inicializado");
  }
  return db;
}

async function seedStickers() {
  for (const sticker of stickers) {
    await getDb().run(
      `
        INSERT OR IGNORE INTO stickers
        (id, name, team, image, rarity)
        VALUES (?, ?, ?, ?, ?)
      `,
      [sticker.id, sticker.name, sticker.team, sticker.image, sticker.rarity],
    );
  }
}

async function seedAchievements() {
  for (const achievement of achievementCatalog) {
    await getDb().run(
      `
        INSERT OR IGNORE INTO achievements
        (id, nome, descricao, icone)
        VALUES (?, ?, ?, ?)
      `,
      [
        achievement.id,
        achievement.nome,
        achievement.descricao,
        achievement.icone,
      ],
    );
  }
}

async function migrateUsuariosSchema() {
  const columns = await getDb().query("PRAGMA table_info(usuarios)");
  const hasLoginColumn = (columns.values || []).some(
    (column: any) => column.name === "login",
  );

  if (!hasLoginColumn) return;

  await getDb().execute("ALTER TABLE usuarios RENAME TO usuarios_old;");
  await getDb().execute(`
    CREATE TABLE usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      telefone TEXT,
      senha TEXT NOT NULL
    );
  `);
  await getDb().execute(`
    INSERT OR IGNORE INTO usuarios
    (id, nome, email, telefone, senha)
    SELECT
      id,
      nome,
      COALESCE(email, login),
      telefone,
      COALESCE(senha, '')
    FROM usuarios_old
    WHERE COALESCE(email, login) IS NOT NULL;
  `);
  await getDb().execute("DROP TABLE usuarios_old;");
}

export async function initDatabase() {
  try {
    await ensureDatabase();
  } catch (error) {
    console.error("Erro ao iniciar DB", error);
    throw error;
  }
}

export async function addContato(
  nome: string,
  email: string,
  telefone: string,
) {
  await ensureDatabase();
  const query = "INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)";

  await getDb().run(query, [nome, email, telefone]);
}

export async function listContatos() {
  await ensureDatabase();
  const result = await getDb().query("SELECT * FROM contatos");
  return result.values || [];
}

export async function deleteContatoById(id: number) {
  await ensureDatabase();
  const query = "DELETE FROM contatos WHERE id = ?";
  return await getDb().run(query, [id]);
}

export async function updateContato(
  id: number,
  nome: string,
  email: string,
  telefone: string,
) {
  await ensureDatabase();
  const query =
    "UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?";

  await getDb().run(query, [nome, email, telefone, id]);
}

export async function findContatoById(id: number) {
  await ensureDatabase();
  const query = "SELECT * FROM contatos WHERE id = ?";

  const result = await getDb().query(query, [id]);

  return result.values || [];
}

export async function addUsuario(
  nome: string,
  email: string,
  telefone: string,
  senha: string,
) {
  await ensureDatabase();
  const query = `
    INSERT INTO usuarios
    (nome, email, telefone, senha)
    VALUES (?, ?, ?, ?)
  `;

  return await getDb().run(query, [nome, email, telefone, senha]);
}

export async function realizarLogin(email: string, senha: string) {
  await ensureDatabase();
  const query = `
    SELECT *
    FROM usuarios
    WHERE lower(email) = lower(?)
    AND senha = ?
    LIMIT 1
  `;

  const result = await getDb().query(query, [email, senha]);

  return result.values?.[0] || null;
}

export async function updateUsuario(
  id: number,
  nome: string,
  email: string,
  telefone: string,
) {
  await ensureDatabase();
  const query = `
    UPDATE usuarios
    SET nome = ?,
      email = ?,
      telefone = ?
    WHERE id = ?
  `;

  return await getDb().run(query, [nome, email, telefone, id]);
}

export async function findUsuarioById(id: number) {
  await ensureDatabase();
  const query = `
    SELECT *
    FROM usuarios
    WHERE id = ?
  `;

  const result = await getDb().query(query, [id]);

  return result.values?.[0] || null;
}

export async function listUsuarios() {
  await ensureDatabase();
  const result = await getDb().query("SELECT * FROM usuarios");

  return result.values || [];
}

export async function deleteUsuarioById(id: number) {
  await ensureDatabase();
  const query = "DELETE FROM usuarios WHERE id = ?";

  return await getDb().run(query, [id]);
}

export async function listStickersFromDb(
  userId: number,
  search = "",
  filter = "all",
) {
  await ensureDatabase();

  const params: Array<string | number> = [userId];
  let where = "";

  if (search.trim()) {
    where += " AND (lower(s.name) LIKE ? OR lower(s.team) LIKE ?)";
    const searchText = `%${search.trim().toLowerCase()}%`;
    params.push(searchText, searchText);
  }

  if (filter === "collected") {
    where += " AND COALESCE(ss.collected, 0) = 1";
  }

  if (filter === "pending") {
    where += " AND COALESCE(ss.collected, 0) = 0";
  }

  if (filter === "favorite") {
    where += " AND COALESCE(ss.favorite, 0) = 1";
  }

  const result = await getDb().query(
    `
      SELECT
        s.id,
        s.name,
        s.team,
        s.image,
        s.rarity,
        COALESCE(ss.collected, 0) AS collected,
        COALESCE(ss.favorite, 0) AS favorite,
        ss.collected_at AS collected_at
      FROM stickers s
      LEFT JOIN sticker_status ss
        ON ss.sticker_id = s.id
        AND ss.user_id = ?
      WHERE 1 = 1
      ${where}
      ORDER BY s.id
    `,
    params,
  );

  return (result.values || []).map((sticker: any) => ({
    ...sticker,
    collected: Boolean(sticker.collected),
    favorite: Boolean(sticker.favorite),
    collected_at: sticker.collected_at || null,
  }));
}

export async function getAlbumStats(userId: number): Promise<AlbumStats> {
  await ensureDatabase();

  const result = await getDb().query(
    `
      SELECT
        COUNT(s.id) AS total,
        SUM(CASE WHEN COALESCE(ss.collected, 0) = 1 THEN 1 ELSE 0 END) AS collected,
        SUM(CASE WHEN COALESCE(ss.collected, 0) = 1 AND s.rarity = 'rara' THEN 1 ELSE 0 END) AS rareCollected,
      SUM(CASE WHEN COALESCE(ss.collected, 0) = 1 AND s.rarity = 'brilhante' THEN 1 ELSE 0 END) AS shinyCollected,
      SUM(CASE WHEN COALESCE(ss.favorite, 0) = 1 THEN 1 ELSE 0 END) AS favoriteCount,
      SUM(
        CASE
          WHEN COALESCE(ss.collected, 0) = 1 AND s.rarity = 'brilhante' THEN 50
          WHEN COALESCE(ss.collected, 0) = 1 AND s.rarity = 'rara' THEN 20
          WHEN COALESCE(ss.collected, 0) = 1 THEN 10
          ELSE 0
        END
      ) AS score
      FROM stickers s
      LEFT JOIN sticker_status ss
        ON ss.sticker_id = s.id
        AND ss.user_id = ?
    `,
    [userId],
  );

  const row = result.values?.[0] || {};
  const total = Number(row.total || 0);
  const collected = Number(row.collected || 0);
  const score = Number(row.score || 0);
  const progress = total === 0 ? 0 : Math.round((collected / total) * 100);

  return {
    total,
    collected,
    pending: total - collected,
    rareCollected: Number(row.rareCollected || 0),
    shinyCollected: Number(row.shinyCollected || 0),
    favoriteCount: Number(row.favoriteCount || 0),
    score,
    progress,
  };
}

export async function toggleStickerCollected(userId: number, stickerId: number) {
  await ensureDatabase();

  const current = await getDb().query(
    `
      SELECT collected, favorite
      FROM sticker_status
      WHERE user_id = ?
      AND sticker_id = ?
      LIMIT 1
    `,
    [userId, stickerId],
  );

  const isCollected = Boolean(current.values?.[0]?.collected);
  const nextCollected = isCollected ? 0 : 1;
  const collectedAt = nextCollected ? new Date().toISOString() : null;
  const favorite = current.values?.[0]?.favorite || 0;

  await getDb().run(
    `
      INSERT INTO sticker_status
      (user_id, sticker_id, collected, favorite, collected_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id, sticker_id)
      DO UPDATE SET
        collected = excluded.collected,
        favorite = excluded.favorite,
        collected_at = excluded.collected_at
    `,
    [userId, stickerId, nextCollected, favorite, collectedAt],
  );

  await recalculateAchievements(userId);
}

export async function toggleStickerFavorite(userId: number, stickerId: number) {
  await ensureDatabase();

  const current = await getDb().query(
    `
      SELECT collected, favorite, collected_at
      FROM sticker_status
      WHERE user_id = ?
      AND sticker_id = ?
      LIMIT 1
    `,
    [userId, stickerId],
  );

  const isFavorite = Boolean(current.values?.[0]?.favorite);
  const favoriteValue = isFavorite ? 0 : 1;
  const collected = current.values?.[0]?.collected || 0;
  const collectedAt = current.values?.[0]?.collected_at || null;

  await getDb().run(
    `
      INSERT INTO sticker_status
      (user_id, sticker_id, collected, favorite, collected_at)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(user_id, sticker_id)
      DO UPDATE SET
        favorite = excluded.favorite,
        collected = excluded.collected,
        collected_at = excluded.collected_at
    `,
    [userId, stickerId, collected, favoriteValue, collectedAt],
  );
}

export async function recalculateAchievements(userId: number) {
  await ensureDatabase();

  const stats = await getAlbumStats(userId);
  const completedTeams = await getCompletedTeams(userId);
  const completedTeamNames = completedTeams.map((team: any) => team.team);
  const unlockedIds = achievementCatalog
    .filter((achievement) => {
      if (achievement.id === 1) return stats.collected >= 1;
      if (achievement.id === 2) return stats.collected >= 10;
      if (achievement.id === 3) return stats.collected >= 25;
      if (achievement.id === 4) return stats.collected >= 50;
      if (achievement.id === 5) return stats.rareCollected >= 5;
      if (achievement.id === 6) return stats.rareCollected >= 15;
      if (achievement.id === 7) return stats.shinyCollected >= 3;
      if (achievement.id === 8) return stats.shinyCollected >= 10;
      if (achievement.id === 9) return stats.progress >= 80;
      if (achievement.id === 10) return stats.progress === 100;
      if ("team" in achievement) return completedTeamNames.includes(achievement.team);

      return false;
    })
    .map((achievement) => achievement.id);

  const now = new Date().toISOString();

  for (const achievementId of unlockedIds) {
    await getDb().run(
      `
        INSERT OR IGNORE INTO user_achievements
        (user_id, achievement_id, data_desbloqueio)
        VALUES (?, ?, ?)
      `,
      [userId, achievementId, now],
    );
  }
}

async function getCompletedTeams(userId: number) {
  const result = await getDb().query(
    `
      SELECT s.team
      FROM stickers s
      LEFT JOIN sticker_status ss
        ON ss.sticker_id = s.id
        AND ss.user_id = ?
      GROUP BY s.team
      HAVING COUNT(s.id) = SUM(CASE WHEN COALESCE(ss.collected, 0) = 1 THEN 1 ELSE 0 END)
    `,
    [userId],
  );

  return result.values || [];
}

export async function listAchievements(userId: number): Promise<Achievement[]> {
  await ensureDatabase();
  await recalculateAchievements(userId);

  const result = await getDb().query(
    `
      SELECT
        a.id,
        a.nome,
        a.descricao,
        a.icone,
        CASE WHEN ua.id IS NULL THEN 0 ELSE 1 END AS desbloqueada,
        ua.data_desbloqueio
      FROM achievements a
      LEFT JOIN user_achievements ua
        ON ua.achievement_id = a.id
        AND ua.user_id = ?
      ORDER BY desbloqueada DESC, a.id
    `,
    [userId],
  );

  return (result.values || []).map((achievement: any) => ({
    ...achievement,
    desbloqueada: Boolean(achievement.desbloqueada),
  }));
}

export async function listCollectionHistory(userId: number) {
  await ensureDatabase();

  const result = await getDb().query(
    `
      SELECT
        s.id,
        s.name,
        s.team,
        s.image,
        s.rarity,
        ss.collected_at
      FROM sticker_status ss
      JOIN stickers s
        ON s.id = ss.sticker_id
      WHERE ss.user_id = ?
        AND ss.collected = 1
      ORDER BY ss.collected_at DESC
    `,
    [userId],
  );

  return (result.values || []).map((item: any) => ({
    ...item,
    collected_at: item.collected_at || null,
  }));
}
