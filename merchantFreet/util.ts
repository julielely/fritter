import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Freet, PopulatedFreet} from '../freet/model';
import type {MerchantFreet, PopulatedMerchantFreet} from './model';

// Update this if you add a property to the Freet type!
type MerchantFreetResponse = {
  _id: string;
  freet: string;
  expiration: string;
  listingStatus: string;
  listingName: string;
  listingPrice: number;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<MerchantFreet>} merchantFreet - A merchantfreet
 * @returns {MerchantFreetResponse} - The freet object formatted for the frontend
 */
const constructMerchantFreetResponse = (merchantFreet: HydratedDocument<MerchantFreet>): MerchantFreetResponse => {
  const merchantFreetCopy: PopulatedMerchantFreet = {
    ...merchantFreet.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  const {authorId} = merchantFreetCopy.freet;
  delete merchantFreetCopy.freet;
  return {
    ...merchantFreetCopy,
    _id: merchantFreetCopy._id.toString(),
    freet: authorId.toString(),
    expiration: formatDate(merchantFreet.expiration),
    listingStatus: "forsale",
    listingName: merchantFreet.listingName,
    listingPrice: merchantFreet.listingPrice
  };
};

export {
  constructMerchantFreetResponse
};
