import Joi from "joi";

export interface GameEntity {
    uuid: string;
}

export const ValidateGame = (game: GameEntity) => {
    const validator = Joi.object<GameEntity>({
        uuid: Joi.string().length(36).required()
    });

    return validator.validate(game);
}