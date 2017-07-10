"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const port = 8080;
const app = express();
app.listen(port);
console.log(`Server started on port ${port}`);
