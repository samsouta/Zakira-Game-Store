export type PromotionType = {
    id: number,
    title: string,
    image_url: string,
    is_active: boolean,
}

export type PromotionResponse = {
    success : boolean,
    data: PromotionType
}
