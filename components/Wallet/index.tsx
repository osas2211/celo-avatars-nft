import React from 'react';
import {Dropdown, Stack, Spinner} from 'react-bootstrap';
import {formatBigNumber, truncateAddress} from '../../utils';
import Identicon from '../UI/Identicon';
import BigNumber from 'bignumber.js';

interface Props {
    address: any,
    amount: BigNumber | undefined,
    symbol: string,
    destroy: Function,
}

const Wallet:React.FC<Props> = ({address, amount, symbol, destroy}) => {
    if (address) {
        return <>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center border rounded-pill py-1">
                        <>{formatBigNumber(amount)} <span className="ms-1"> {symbol}</span></>
                </Dropdown.Toggle>

                <Dropdown.Menu className="shadow-lg border-0" >
                    <Dropdown.Item href={`https://alfajores-blockscout.celo-testnet.org/address/${address}/transactions`}  target="_blank">     
                        <Stack direction="horizontal" gap={2}>
                        <i className="bi bi-person-circle fs-4" />
                        <span className="font-monospace">{truncateAddress(address)}</span>
                        </Stack>
                    </Dropdown.Item>
                    <Dropdown.Divider/>
                    <Dropdown.Item as="button" className="d-flex align-items-center" onClick={() => {
                            destroy()
                        }}>
                        <i className="bi bi-box-arrow-right me-2 fs-4"/>
                        Disconnect
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    }

  return null;
};

export default Wallet;