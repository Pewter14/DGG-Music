export class UsersModel {
  static STORAGE_KEY = 'dgg_users';
  static SESSION_KEY = 'dgg_session';

  static _loadAll() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  static _saveAll(users) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  static create({ name, email, pass, tel }) {
    const users = this._loadAll();
    if (users.some(u => u.email === email.toLowerCase())) {
      throw new Error('E-mail já cadastrado');
    }
    const user = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      pass,
      tel,
      registeredAt: new Date().toISOString(),
    };
    users.push(user);
    this._saveAll(users);
    return user;
  }

  static findByEmail(email) {
    return this._loadAll().find(u => u.email === email.toLowerCase()) || null;
  }

  static login(email, pass) {
    const user = this.findByEmail(email);
    if (!user || user.pass !== pass) {
      throw new Error('Credenciais inválidas');
    }
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({ id: user.id }));
    return user;
  }

  static logout() {
    localStorage.removeItem(this.SESSION_KEY);
  }

  static current() {
    const raw = localStorage.getItem(this.SESSION_KEY);
    if (!raw) return null;
    const { id } = JSON.parse(raw);
    return this._loadAll().find(u => u.id === id) || null;
  }
}