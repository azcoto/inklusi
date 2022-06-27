import { Router } from 'express';
import allTipeDebitur from './allTipeDebitur';

const tipeDebitur = Router();

tipeDebitur.get('/', allTipeDebitur);

export default tipeDebitur;
