--
-- Файл сгенерирован с помощью SQLiteStudio v3.2.1 в Вт авг 28 09:37:48 2018
--
-- Использованная кодировка текста: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Таблица: estimate
DROP TABLE IF EXISTS estimate;
CREATE TABLE estimate (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, jobCategoryId INTEGER REFERENCES jobCategory (Id) NOT NULL, number INTEGER NOT NULL, creationDate DATE, client TEXT, note TEXT);

-- Таблица: estimateItem
DROP TABLE IF EXISTS estimateItem;
CREATE TABLE estimateItem (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, estimateId INTEGER REFERENCES Estimate (Id) NOT NULL, productId INTEGER REFERENCES product (Id), productGroupId INTEGER REFERENCES productGroup (Id), number INTEGER NOT NULL, price REAL, extra REAL, priceWithExtra REAL, quantity INTEGER, cost REAL, discount REAL, total REAL, hourNorm REAL, managerNote TEXT, note TEXT, footNote TEXT);

-- Таблица: extraExpenses
DROP TABLE IF EXISTS extraExpenses;
CREATE TABLE extraExpenses (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, estimateId INTEGER REFERENCES estimate (id) NOT NULL, number INTEGER NOT NULL, valueRate REAL, value REAL, note TEXT, type TEXT);

-- Таблица: jobCategory
DROP TABLE IF EXISTS jobCategory;
CREATE TABLE jobCategory (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, hourNormCost REAL);

-- Таблица: laborCost
DROP TABLE IF EXISTS laborCost;
CREATE TABLE laborCost (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, productId INTEGER REFERENCES product (Id) NOT NULL, jobCategoryId INTEGER REFERENCES jobCategory (Id), hourNorm REAL NOT NULL);

-- Таблица: product
DROP TABLE IF EXISTS product;
CREATE TABLE product (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, productGroupId INTEGER REFERENCES productGroup (Id), vendorCode TEXT NOT NULL, name TEXT NOT NULL, unit TEXT, managerNote TEXT, note TEXT, footNote TEXT);

-- Таблица: productGroup
DROP TABLE IF EXISTS productGroup;
CREATE TABLE productGroup (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);

-- Триггер: dlaborCostJC
DROP TRIGGER IF EXISTS dlaborCostJC;
CREATE TRIGGER dlaborCostJC AFTER DELETE ON jobCategory BEGIN delete from laborCost where laborCost.jobCategoryId = old.id; END;

-- Триггер: dLaborCostP
DROP TRIGGER IF EXISTS dLaborCostP;
CREATE TRIGGER dLaborCostP AFTER DELETE ON product FOR EACH ROW BEGIN delete from laborCost where laborCost.productId = old.id; END;

-- Триггер: ilaborCostJC
DROP TRIGGER IF EXISTS ilaborCostJC;
CREATE TRIGGER ilaborCostJC AFTER INSERT ON jobCategory BEGIN INSERT INTO laborCost (productId, jobCategoryId, hourNorm) 
SELECT product.id, new.id, 0 FROM product; END;

-- Триггер: iLaborCostP
DROP TRIGGER IF EXISTS iLaborCostP;
CREATE TRIGGER iLaborCostP AFTER INSERT ON product FOR EACH ROW BEGIN INSERT INTO laborCost (productId, jobCategoryId, hourNorm) 
select new.id, jc.id, 0 from jobCategory jc; END;

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
