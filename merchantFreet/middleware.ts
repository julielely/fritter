import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FreetCollection from '../freet/collection';

/**
 * Checks if the content of the merchant freet in req.body is valid
 */
const isValidMerchantFreetTitle = (req: Request, res: Response, next: NextFunction) => {
  const {listingName} = req.body as {listingName: string};
  if (!listingName.trim()) {
    res.status(400).json({
      error: 'Freet title must be at least one character long.'
    });
    return;
  }

  if (listingName.length > 80) {
    res.status(413).json({
      error: 'Merchant Freet title must be no more than 80 characters.'
    });
    return;
  }

  next();
};

/**
 * Checks if the price is an integer
 */
const isValidPrice = async (req: Request, res: Response, next: NextFunction) => {
  const {listingPrice} = req.body as {listingPrice: string};
  const number = parseInt(listingPrice);
  if (number) {
    res.status(400).json({
      error: 'Price is invalid.'
    });
    return;
  }

  next();
};

export {
  isValidMerchantFreetTitle,
  isValidPrice,
};
