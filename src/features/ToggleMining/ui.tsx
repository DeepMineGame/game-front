import {MainActionButton} from "shared/ui/components";
import {toggleMining, userStore} from "entities/user/model";
import {useStore} from "effector-react";

export function ToggleMining() {
    const user = useStore(userStore);

    return <MainActionButton onClick={toggleMining}>
        {user?.isMining ? 'Stop Mining' : 'Mine DME'}
    </MainActionButton>
}