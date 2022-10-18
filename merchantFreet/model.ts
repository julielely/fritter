import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {Freet} from '../freet/model';
// import type {User} from '../user/model';

/**
 * This file defines the properties stored in a Freet
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Freet on the backend
export type MerchantFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  freet: Types.ObjectId; // references the parent Freet
  // fleeting: Types.ObjectId; references an automatic fleeting time
  expiration: Date;
  listingStatus: string;
  listingName: string;
  listingPrice: number;
};

export type PopulatedMerchantFreet = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  freet: Freet;
  expiration: Date;
  listingStatus: string;
  listingName: string;
  listingPrice: number;
};

// Mongoose schema definition for interfacing with a MongoDB table
// Freets stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const MerchantFreetSchema = new Schema<MerchantFreet>({
  // The parent freet
  freet: {
    // Use Types.ObjectId outside of the schema
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Freet'
  },
  // Expiration of Merchant Freet
  // fleeting: {
  //   type: Schema.Types.ObjectId,
  //   required: true
  // },
  expiration: {
    type: Date,
    required: true
  },
  // Status of listing (sold or not sold)
  listingStatus: {
    type: String,
    required: true
  },
  // Name of item user is selling
  listingName: {
    type: String,
    required: true
  },
  // Price of item user is selling
  listingPrice: {
    type: Number,
    required: true
  }
}, {
  toObject: { virtuals: true, versionKey: false },
  toJSON: { virtuals: true, versionKey: false }
});

MerchantFreetSchema.index({ freet: 1}, { unique: true });

const MerchantFreetModel = model<MerchantFreet>('MerchantFreet', MerchantFreetSchema);
export default MerchantFreetModel;
