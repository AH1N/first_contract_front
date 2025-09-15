import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from './useAsyncInitialize';


//Этот хук возвращает готового клиента TON,
// который создается асинхронно при монтировании компонента или изменении зависимостей.


//Объявление функции-хука useTonClient, которая возвращает настроенного клиента TON.
export function useTonClient() {
    //Использование useAsyncInitialize для асинхронной инициализации клиента
    return useAsyncInitialize(
        //Объявление асинхронной функции, которая создаст и вернет TonClient.
        async () =>
            new TonClient({
                //Асинхронно получает URL API для тестовой сети TON и передает его в TonClient.
                endpoint: await getHttpEndpoint({ network: 'testnet' }),
            })
    );
}