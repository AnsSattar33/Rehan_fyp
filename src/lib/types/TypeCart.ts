// types/CartItem.ts
export interface CartItem {
    id: string,
    name: string,
    brand: string,
    price: number,
    description: string,
    imageUrl: string,
    quantity: number,
    requiresPrescription: boolean,
    generics: string,
    usedFor: string,
    howItWorks: string,
    dosage: string,
    sideEffects: string,
    drugInteractions: string,
    indication: string,
    whenNotToUse: string
}
