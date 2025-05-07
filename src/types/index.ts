export interface Driver {
  id: number
  name: string
  location: string
}

export interface Tour {
  id: number
  customerName: string
  shipmentDate: string
  locationFrom: string
  locationTo: string
  driverId?: number | null
}
