import { useEffect, useState } from "react";


//Обеспечивает автоматическую загрузку данных при монтировании
//компонента или изменении зависимостей, упрощая работу с асинхронным кодом в React
export function useAsyncInitialize<T>(
    func: () => Promise<T>,//принимает функцию func, возвращающую промис (асинхронную операцию)
    deps: unknown[] = [] //массив зависимостей
) {
    const [state, setState] = useState<T | undefined>(); //useState для хранения результата (state).
    useEffect(() => { //useEffect для запуска функции func при изменении зависимостей.
        (async () => {
            setState(await func());//Обновляет состояние после завершения асинхронной операции.
        })();
    }, deps);

    return state;
}