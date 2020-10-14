import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

export default {
  
  async index(request: Request, response: Response): Promise<void> {
    const orphanageRepository = getRepository(Orphanage);
    const orphanages = await orphanageRepository.find();
    response.json(orphanages); 
  },
  async create(request: Request, response: Response): Promise<void>{
    const { 
      name, 
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;
  
    const orphanageRepository = getRepository(Orphanage);
    const orphanage = orphanageRepository.create({ 
      name, 
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    });
    
    await orphanageRepository.save(orphanage);

    response.status(201).json(orphanage);
  }
}