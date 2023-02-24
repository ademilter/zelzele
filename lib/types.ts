import { DateTime } from "luxon";

export type Filter = {
  hide: number;
};

export type Data = {
  lastUpdate: string;
  data: ItemProps[];
};

export type DataByDay = Record<string, Item[]>; // YYYY-MM-DD

export interface ItemProps {
  date: string;
  depth: number;
  id: number;
  latitude: number;
  location: string;
  longitude: number;
  magnitude: number;
  type: string;
}

export class Item {
  public date: string;
  public depth: number;
  public id: number;
  public latitude: number;
  public location: string;
  public longitude: number;
  public magnitude: number;
  public type: string;

  constructor({
    date,
    depth,
    id,
    latitude,
    location,
    longitude,
    magnitude,
    type,
  }: ItemProps) {
    this.date = date;
    this.depth = depth;
    this.id = id;
    this.latitude = latitude;
    this.location = location;
    this.longitude = longitude;
    this.magnitude = magnitude;
    this.type = type;
  }

  get magnitudeFloor(): string {
    return Math.floor(this.magnitude).toString();
  }

  get dateTimeObj() {
    return DateTime.fromISO(this.date, {
      zone: "Europe/Istanbul",
      locale: "tr",
    }).plus({ hours: 3 });
  }
}
