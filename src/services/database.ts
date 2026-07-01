import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";

const dbName = "appdata";
let db: SQLiteDBConnection | null = null;
let initialized = false;
const sqliteconnection = new SQLiteConnection(CapacitorSQLite);

async function ensureDatabase() {
  if (initialized && db) {
    return;
  }

  if (!db) {
    db = await sqliteconnection.createConnection(
      dbName,
      false,
      "no-encyption",
      1,
      false,
    );
  }

  await db.open();
  // Tabela de contatos
  await db.execute(`
            CREATE TABLE IF NOT EXISTS contatos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                telefone TEXT
            );
        `);

  // Tabela de usuários
  await db.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                login TEXT NOT NULL UNIQUE,
                senha TEXT 
            );
        `);

  initialized = true;
}

function getDb() {
  if (!db) {
    throw new Error("Banco de dados ainda não inicializado");
  }
  return db;
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
  await ensureDatabase()
  const query = "INSERT INTO contatos (nome, email, telefone) VALUES (?, ?, ?)";

  await getDb().run(query, [nome, email, telefone]);
}

export async function listContatos() { await ensureDatabase()
  const result = await getDb().query("SELECT * FROM contatos");
  return result.values || [];
}

export async function deleteContatoById(id: number) {
    await ensureDatabase()
  const query = "DELETE FROM contatos WHERE id = ?";
  return await getDb().run(query, [id]);
}

export async function updateContato(
  id: number,
  nome: string,
  email: string,
  telefone: string,
) { await ensureDatabase()
  const query =
    "UPDATE contatos SET nome = ?, email = ?, telefone = ? WHERE id = ?";

  await getDb().run(query, [nome, email, telefone, id]);
}

export async function findContatoById(id: number) { await ensureDatabase()
  const query = "SELECT * FROM contatos WHERE id = ?";

  const result = await getDb().query(query, [id]);

  return result.values || [];
}

export async function addUsuario(
  nome: string,
  email: string,
  telefone: string,
  senha: string,
) { await ensureDatabase()
  const query = `
        INSERT INTO usuarios
        (nome, email, telefone, senha)
        VALUES (?, ?, ?, ?)
    `;

  return await getDb().run(query, [nome, email, telefone, senha]);
}

export async function realizarLogin(email: string, senha: string) { await ensureDatabase()
  const query = `
        SELECT *
        FROM usuarios
        WHERE email = ?
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
) { await ensureDatabase()
  const query = `
        UPDATE usuarios
        SET nome = ?,
            email = ?,
            telefone = ?
        WHERE id = ?
    `;

  return await getDb().run(query, [nome, email, telefone, id]);
}

export async function findUsuarioById(id: number) { await ensureDatabase()
  const query = `
        SELECT *
        FROM usuarios
        WHERE id = ?
    `;

  const result = await getDb().query(query, [id]);

  return result.values?.[0] || null;
}

export async function listUsuarios() { await ensureDatabase()
  const result = await getDb().query("SELECT * FROM usuarios");

  return result.values || [];
}

export async function deleteUsuarioById(id: number) { await ensureDatabase()
  const query = "DELETE FROM usuarios WHERE id = ?";

  return await getDb().run(query, [id]);
}
