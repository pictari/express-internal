import { Request, Response } from "express";
import { BrokenTelephoneEntry } from "../models/orm/broken_telephone_entry";
import { BrokenTelephoneGame } from "../models/orm/broken_telephone_game";
import { AccountDataSource } from "../rdbms";
import { ContentType } from "../models/orm/common_enums";
import Joi from "joi";
import { ValidateGame } from "../models/rest/game_entity";
import { ValidateEntry } from "../models/rest/entry_entity";
import { Account } from "../models/orm/account";

const brokentelRepo = AccountDataSource.getRepository(BrokenTelephoneGame);
const brokentelEntryRepo = AccountDataSource.getRepository(BrokenTelephoneEntry);
const accountRepo = AccountDataSource.getRepository(Account);

export const postNewGame = async (req: Request, res: Response) => {

    let body = req.body;
    let validationResult: Joi.ValidationResult = ValidateGame(body);

    if (validationResult.error) {
        res.status(400).json(validationResult.error);
        return;
    }

    try {
        let newGame : BrokenTelephoneGame = new BrokenTelephoneGame();
        newGame.accountUuid = body.uuid;

        let returnedId = (await brokentelRepo.insert(newGame)).identifiers[0].id;
        res.status(201).json(`{"new":${returnedId}}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Issue creating new game: ${error.message}`);
        }
        else {
            console.log(`Error: ${error}`);
        }
        res.status(500).send(`Couldn't create a new game.`);
    }
}

export const postNewEntry = async (req: Request, res: Response) => {

    let body = req.body;
    let validationResult: Joi.ValidationResult = ValidateEntry(body);

    if (validationResult.error) {
        res.status(400).json(validationResult.error);
        return;
    }

    try {
        let newEntry : BrokenTelephoneEntry = new BrokenTelephoneEntry();
        newEntry.gameId = body.gameId;
        newEntry.accountUuid = body.uuid;
        newEntry.stream = body.stream;
        newEntry.index = body.index;
        newEntry.contentType = body.contentType;
        newEntry.content = body.content;
        newEntry.totalRating = 0;

        AccountDataSource.manager.save(newEntry);
        res.status(201).send(`Created a new entry`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Issue creating new entry: ${error.message}`);
        }
        else {
            console.log(`Error: ${error}`);
        }
        res.status(500).send(`Couldn't create a new entry.`);
    }
}

export const putGameStatistics = async (req: Request, res: Response) => {
    let uuid = req.params.uuid;
    if(uuid == undefined || uuid == null) {
        res.status(400).send(`Bad UUID.`);
        return;
    }

    let fetchedAccount = await accountRepo.findOneBy({uuid: uuid});
    if(fetchedAccount == null) {
        res.status(404).send(`No such account.`);
        return;
    }

    try {
        if(fetchedAccount.gamesPlayed == null) {
            fetchedAccount.gamesPlayed = 0;
        }
        fetchedAccount.gamesPlayed += 1;
        AccountDataSource.manager.save(fetchedAccount);
        res.status(204).send(`Update successful.`);
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Issue updating statistics: ${error.message}`);
        }
        else {
            console.log(`Error: ${error}`);
        }
        res.status(500).send(`Couldn't update that account's statistics.`);
    }
}