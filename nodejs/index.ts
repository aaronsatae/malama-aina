import * as fs from 'fs';

let template: Buffer = fs.readFileSync('./../templates/v1.svg');

const weapons: Buffer[] = [];
const mouths: Buffer[] = [];
const eyebrows: Buffer[] = [];
const eyeAndNoses: Buffer[] = [];
const hairs: Buffer[] = [];

const rightHand: Buffer = fs.readFileSync('./../images/rightHand.png');
const body: Buffer = fs.readFileSync('./../images/body.png');
const head: Buffer = fs.readFileSync('./../images/head.png');

