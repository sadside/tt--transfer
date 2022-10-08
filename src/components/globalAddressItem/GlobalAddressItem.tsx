import styles from "./GlobalAddressItem.module.scss";

interface GlobalAddressItemProps {
  address: string;
  id: number;
}

const GlobalAddressItem = ({ address, id }: GlobalAddressItemProps) => {
  return (
    <>
      <div className={styles.globalAddressItemWrap}>
        <div className={styles.address}>{address}</div>
        <div className={styles.editAddress}>Удалить</div>
        <div className={styles.removeAddress}>Редактировать</div>
      </div>
    </>
  );
};

export { GlobalAddressItem };
