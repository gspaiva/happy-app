import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import Image from '../models/Image';

export default {
  
  async index(request: Request, response: Response): Promise<void> {
    const orphanageRepository = getRepository(Orphanage);
    const orphanages = await orphanageRepository.find({
      relations: ['images']
    });
    response.json(orphanages); 
  },
  async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const orphanageRepository = getRepository(Orphanage);
    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    });
    response.json(orphanage); 
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

    const openOnWeekendsParsed: boolean = open_on_weekends === 'true' ? true : false;
  
    const orphanageRepository = getRepository(Orphanage);
    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map(image => {
      return { path: image.filename }
    });

    const orphanage = orphanageRepository.create({ 
      name, 
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: openOnWeekendsParsed,
      images
    });
    
    await orphanageRepository.save(orphanage);

    response.status(201).json(orphanage);
  }
}