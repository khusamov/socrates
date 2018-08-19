--
-- Файл сгенерирован с помощью SQLiteStudio v3.2.1 в Вс авг 19 13:18:42 2018
--
-- Использованная кодировка текста: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Таблица: Estimate
CREATE TABLE Estimate (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Number INTEGER NOT NULL, CreationDate DATE, Client TEXT, Note TEXT);

-- Таблица: EstimateItem
CREATE TABLE EstimateItem (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, EstimateId INTEGER REFERENCES Estimate (ID) NOT NULL, Number INTEGER NOT NULL, ProductId INTEGER REFERENCES Product (ID), Price REAL, Extra REAL, PriceWithExtra REAL, Quantity INTEGER, Cost REAL, Discount REAL, Total REAL, HourNorm REAL, " ManagerNote" TEXT, Note TEXT, Footnote TEXT, ProductGroupId INTEGER REFERENCES ProductGroup (ID));

-- Таблица: ExtraExpenses
CREATE TABLE ExtraExpenses (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ValueRate REAL, Value REAL, Note TEXT, Type TEXT, Number INTEGER NOT NULL);

-- Таблица: JobCategory
CREATE TABLE JobCategory (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, Name TEXT NOT NULL, HourNormCost REAL);

-- Таблица: LaborCost
CREATE TABLE LaborCost (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ProductId INTEGER REFERENCES Product (ID) NOT NULL, JobCategoryId INTEGER REFERENCES JobCategory (ID), HourNorm REAL NOT NULL);

-- Таблица: Product
CREATE TABLE Product (ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, VendorCode TEXT NOT NULL, Name TEXT NOT NULL, Unit TEXT, ManagerNote TEXT, Note TEXT, Footnote TEXT, ProductGroupId INTEGER REFERENCES ProductGroup (ID));

-- Таблица: ProductGroup
CREATE TABLE ProductGroup (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
