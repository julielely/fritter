import type {HydratedDocument, Types} from 'mongoose';
import type {Freet} from '../freet/model';
import MerchantFreetModel, { MerchantFreet } from './model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

/**
 * This files contains a class that has the functionality to explore freets
 * stored in MongoDB, including adding, finding, updating, and deleting freets.
 * Feel free to add additional operations in this file.
 *
 * Note: HydratedDocument<Freet> is the output of the FreetModel() constructor,
 * and contains all the information in Freet. https://mongoosejs.com/docs/typescript.html
 */
class MerchantFreetCollection {
  /**
   * Add a merchantFreet to the collection
   *
   * @param {string} freet - The parent freet
   * @param {Date} expiration - When the listing will expire
   * @param {string} listingStatus - The item status
   * @param {string} listingName - The item name
   * @param {number} listingPrice - The item price
   * @return {Promise<HydratedDocument<MerchantFreet>>} - The newly created freet
   */
  static async addOne(freet: Types.ObjectId | string, expiration: Date, listingStatus: string, listingName: string, listingPrice: number): Promise<HydratedDocument<MerchantFreet>> {
    const merchantFreet = new MerchantFreetModel({
      freet, // references the parent Freet
      expiration, 
      listingStatus,
      listingName,
      listingPrice
    });
    await merchantFreet.save(); // Saves merchant freet to MongoDB
    return merchantFreet.populate('freet');
  }

  /**
   * Find a merchantFreet by merchantFreetId
   *
   * @param {string} merchantFreetId - The id of the Merchant Freet to find
   * @return {Promise<HydratedDocumentMerchantFreet> | Promise<null> } - The Merchant Freet with the given merchantFreetId, if any
   */
  static async findOne(merchantFreetId: Types.ObjectId | string): Promise<HydratedDocument<MerchantFreet>> {
    return MerchantFreetModel.findOne({_id: merchantFreetId}).populate('freet');
  }

  /**
   * Get all the merchant freets in the database
   *
   * @return {Promise<HydratedDocument<MerchantFreet>[]>} - An array of all of the Merchant Freets
   */
  static async findAll(): Promise<Array<HydratedDocument<MerchantFreet>>> {
    // Retrieves freets and sorts them from most to least recent
    return MerchantFreetModel.find({}).sort({dateModified: -1}).populate('freet');
  }

//   /**
//    * Get all the merchant freets in by given author
//    *
//    * @param {string} username - The username of author of the freets
//    * @return {Promise<HydratedDocument<MerchantFreet>[]>} - An array of all of the freets
//    */
//   static async findAllByUsername(username: string): Promise<Array<HydratedDocument<MerchantFreet>>> {
//     const freet = await FreetCollection.findAllByUsername(username);
//     return FreetModel.find({authorId: author._id}).populate('authorId');
//   }

//   /**
//    * Update a freet with the new content
//    *
//    * @param {string} freetId - The id of the freet to be updated
//    * @param {string} content - The new content of the freet
//    * @return {Promise<HydratedDocument<Freet>>} - The newly updated freet
//    */
//   static async updateOne(freetId: Types.ObjectId | string, content: string): Promise<HydratedDocument<Freet>> {
//     const freet = await FreetModel.findOne({_id: freetId});
//     freet.content = content;
//     freet.dateModified = new Date();
//     await freet.save();
//     return freet.populate('authorId');
//   }

//   /**
//    * Delete a freet with given freetId.
//    *
//    * @param {string} freetId - The freetId of freet to delete
//    * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
//    */
//   static async deleteOne(freetId: Types.ObjectId | string): Promise<boolean> {
//     const freet = await FreetModel.deleteOne({_id: freetId});
//     return freet !== null;
//   }

//   /**
//    * Delete all the freets by the given author
//    *
//    * @param {string} authorId - The id of author of freets
//    */
//   static async deleteMany(authorId: Types.ObjectId | string): Promise<void> {
//     await FreetModel.deleteMany({authorId});
//   }
}

export default MerchantFreetCollection;
