# to-do-list

Application web pour **gérer ses tâches** et **les planifier** (CRUD + filtres).  
Stack : **Node.js / Express / Pug / Sequelize / MySQL**.

---

## 1) Prérequis

- **Node.js 18+**
- **MySQL** (local ou distant) et une base vide créée (ex. `to-do-list`)

---

## 2) Installation

```bash
# cloner le projet
git clone <url-du-repo> to-do-list
cd to-do-list

# installer les dépendances
npm install
```

## 3) Configuration (.env / .env.local)

```bash
# Dupliquer .env → .env.local :
cp .env .env.local
```

## 3) Configuration (.env / .env.local)

```bash
# Exécuter les migrations :
npx sequelize-cli db:migrate
```