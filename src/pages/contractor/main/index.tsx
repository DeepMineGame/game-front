import {BackButton, Header} from "shared/ui/components";
import classNames from "classnames";
import styles from './index.module.scss';
import {ToggleMining} from "../../../features/ToggleMining/ui";

const ContractorMainPage = () => {
    return <div className={classNames(styles.page)}>
        <Header>
            Union button
        </Header>
        <BackButton />
        <ToggleMining />
    </div>;
};

export default ContractorMainPage;