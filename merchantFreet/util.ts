import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Freet, PopulatedFreet} from '../freet/model';
import type {MerchantFreet, PopulatedMerchantFreet} from './model';
import MerchantFreetCollection from './collection';

// Update this if you add a property to the Freet type!
type MerchantFreetResponse = {
  _id: string;
  freet: string;
  expiration: string;
  listingStatus: string;
  listingName: string;
  listingPrice: number;
  listingLocation: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Check if merchantFreet is forSale
 * 
 * @param {Freet} freet - A freet object
 * @returns {Boolean} - True if freet is forSale, false otherwise
 */
const isForSale = async (freet: HydratedDocument<Freet>): Promise<Boolean> => {
  const freetId = freet._id;
  const merchantFreet = await MerchantFreetCollection.findOneByFreet(freetId);
  const merchantFreetStatus = merchantFreet.listingStatus;
  return merchantFreetStatus == "forsale"
}

/**
 * Check if merchantFreet is forSale
 * 
 * @param {Freet} freet - A freet object
 * @returns {Boolean} - True if freet is sold, false otherwise
 */
 const isSold = async (freet: HydratedDocument<Freet>): Promise<Boolean> => {
  const freetId = freet._id;
  const merchantFreet = await MerchantFreetCollection.findOneByFreet(freetId);
  const merchantFreetStatus = merchantFreet.listingStatus;
  return merchantFreetStatus == "sold"
}

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

  const {content} = merchantFreetCopy.freet;
  const {expiration} = merchantFreetCopy.freet;
  delete merchantFreetCopy.freet;
  return {
    ...merchantFreetCopy,
    _id: merchantFreetCopy._id.toString(),
    freet: content,
    expiration: formatDate(expiration),
    listingStatus: merchantFreet.listingStatus,
    listingName: merchantFreet.listingName,
    listingPrice: merchantFreet.listingPrice,
    listingLocation: merchantFreet.listingLocation
  };
};

export {
  constructMerchantFreetResponse,
  isForSale,
  isSold
};
