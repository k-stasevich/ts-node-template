import supertestRequest from 'supertest';
import app from '../../src/server';

export const request = supertestRequest(app);
