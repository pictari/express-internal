import { ContentType } from "../orm/common_enums";
import Joi from "joi";

export interface EntryEntity {
    gameId: number;
    stream: number;
    index: number;
    contentType: ContentType;
    content: string;
    uuid: string;
}

export const ValidateEntry = (entry: EntryEntity) => {
    const validator = Joi.object<EntryEntity>({
        gameId: Joi.number().required(),
        stream: Joi.number().required(),
        index: Joi.number().required(),
        contentType: Joi.number().required(),
        content: Joi.string().required(),
        uuid: Joi.string().length(36).required()
    });

    return validator.validate(entry);
}