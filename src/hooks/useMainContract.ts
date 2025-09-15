import { useEffect, useState } from "react";
import { MainContract } from "../contracts/MainContract.ts";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect.ts";
//import { Address, type OpenedContract } from "ton-core";
//'@ton/core';
import { Address, type OpenedContract, toNano } from "@ton/core";

export function useMainContract() {
    //Получение клиента TON через кастомный хук useTonClient
    const client = useTonClient();
    const { sender } = useTonConnect();

    const sleep = (time: number) =>
        new Promise(resolve => setTimeout(resolve, time));

    //Создание состояния contractData, которое хранит данные контракта или null.
    const [contractData, setContractData] = useState<null | {
        counter_value: number;
        recent_sender: Address;
        owner_address: Address;
    }>();

    // Создание состояния balance, которое хранит баланс контракта или null. Изначально 0.
    const [balance, setBalance] = useState<null | number>(0);

    //Использование хука useAsyncInitialize для асинхронной инициализации контракта.
    const mainContract = useAsyncInitialize(async () => {
        // Если клиента нет, выход из функции.
        if (!client) return;
        const contract = new MainContract(
            Address.parse("kQCa_u_WD8cXfAXAlgEroXx2kalBD0igEm7aXjANgDvtwpUk") // replace with your address from tutorial 2 step 8
        );
        return client.open(contract) as OpenedContract<MainContract>;
    }, [client]);

    //Запускается при изменении mainContract.
    useEffect(() => {
        async function getValue() {
            if (!mainContract) return; //Выход, если контракт не инициализирован.
            setContractData(null); //Обнуляет текущие данные.
            const val = await mainContract.getData();
            const { balance }  = await mainContract.getBalance();
            setContractData({
                counter_value: val.number,
                recent_sender: val.recent_sender,
                owner_address: val.owner_address,
            });
            setBalance(balance);
            await sleep(5000);
            getValue();
        }
        getValue();
    }, [mainContract]);

    return {
        contract_address: mainContract?.address.toString(),
        contract_balance: balance,
        ...contractData,
        sendIncrement: async () => {
            return mainContract?.sendIncrement(sender, toNano(0.05),5);
        }
    };
}
