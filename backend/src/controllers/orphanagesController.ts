import {Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanage_view';
import * as Yup from 'yup';

export default {
  
  async index(request: Request, response: Response): Promise<void> {
    const orphanageRepository = getRepository(Orphanage);
    const orphanages = await orphanageRepository.find({
      relations: ['images']
    });
    response.json(orphanageView.renderMany(orphanages)); 
  },
  async show(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const orphanageRepository = getRepository(Orphanage);
    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    });
    response.json(orphanageView.render(orphanage)); 
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

    const data = {
      name, 
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: openOnWeekendsParsed,
      images
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
      }))
    });

    await schema.validate(data, {
      abortEarly: false
    });

    const orphanage = orphanageRepository.create(data);
    
    await orphanageRepository.save(orphanage);

    response.status(201).json(orphanage);
  }
}