import { useEffect, useState, useContext } from 'react';
import AppContext from '../../context/AppContext';
import priceData from '../../../data/price-data';
import Price from '../../components/Price/Price';
import API from '../../utils/api/api';
import './TeTool.scss';


export default function TeTool() {
    const { user } = useContext(AppContext);
    const [teInfo, setTeInfo] = useState({ brand: '', width: '', eaLength: '', closing: '', length: '', row: '', hole: '', sameOrNot: '', entraxe: '', entraxeA: '', entraxeB: '', entraxeC: '', entraxeD: '', entraxeE: '', entraxeF: '', entraxeG: '', entraxeH: '', sangle: '', sangleNS: "", holeForBar: "", holeForRope: "", holeForBarEntraxe: "", priceTE: "" });
    const [slide, setSlide] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const [teList, setTeList] = useState([]);
    const [teListFiltered, setTeListFiltered] = useState([]);
    const { cordon, sangle, barre } = priceData;

    if (teInfo.sangle === '3' && teInfo.sangleNS !== '') {
        setTeInfo({ ...teInfo, sangleNS: '' })
    }

    useEffect(() => {
        const fetchTE = async () => {
            try {
                const result = await API.product.getAllTE(user.token);
                result.data.map((te) => {
                    te.closing = te.image_link.includes('sangle') ? 'sangle' : te.image_link.includes('cordon') ? 'cordon' : 'barre';
                });
                setTeList(result.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        }
        fetchTE();
        setIsLoaded(true);
    }, []);

    const reference = {
        bongard: [
            ['cs1t', 'TE_56X19_3S_B', 'sangle'],
            ['cs2t', 'TE_56X23_3S_B', 'sangle'],
            ['cs3t', 'TE_56X26_3S_B', 'sangle'],
            ['cs4t', 'TE_56X30_3S_B', 'sangle'],
            ['cs5t', 'TE_70X19_3S_B', 'sangle'],
            ['cs6t', 'TE_70X23_3S_B', 'sangle'],
            ['cs7t', 'TE_70X26_3S_B', 'sangle'],
            ['cs8t', 'TE_70X30_3S_B', 'sangle'],
            ['csv800 long toile 1940', 'TE_75X19_3S_B', 'sangle'],
            ['csv800 long toile 2310', 'TE_75X23_3S_B', 'sangle'],
            ['csv800 long toile 2680', 'TE_75X26_3S_B', 'sangle'],
            ['csv800 long toile 3050', 'TE_75X30_3S_B', 'sangle']
        ],
        fringand: [
            ['28.1.101', 'TEE_56X23_5O_13', 'barre'],
            ['28.1.102', 'TEE_56X31_5O_13', 'barre'],
            ['28.1.104', 'TEE_56X32_5O_13', 'barre'],
            ['28.1.109', 'TEE_56X42_5O_13', 'barre'],
            ['28.1.110', 'TEE_56X30_5O_13', 'barre'],
            ['28.1.111', 'TEE_56X57_5O_13', 'barre'],
            ['28.112', 'TEE_56X54_5O_13', 'barre'],
            ['28.1.113', 'TEE_56X402_5O_13', 'barre'],
            ['28.1.114', 'TEE_56X36_5O_13', 'barre'],
            ['28.1.115', 'TEE_56X47_5O_13', 'barre'],
            ['28.1.118', 'TEE_56X50_5O_13', 'barre'],
            ['28.1.119', 'TEE_56X55_5O_13', 'barre'],
            ['28.1.121', 'TEE_56X62_5O_13', 'barre'],
            ['28.1.123', 'TEE_55X60_5O_13_FRI', 'barre'],
            ['28.1.131', 'TEE_56X67_5O_13', 'barre'],
            ['28.1.141', 'TEE_56X73_5O_13', 'barre'],
            ['28.1.209', 'TEE_71X42_5O_13', 'barre'],
            ['28.1.210', 'TEE_71X30_5O_13', 'barre'],
            ['28.1.211', 'TEE_71X57_5O_13', 'barre'],
            ['28.1.212', 'TEE_71X54_5O_13', 'barre'],
            ['28.1.213', 'TEE_71X40_5O_13', 'barre'],
            ['28.1.214', 'TEE_71X36_5O_13', 'barre'],
            ['28.1.215', 'TEE_71X47_5O_13', 'barre'],
            ['28.1.216 avant 2013', 'TEE_71X43_5O_13', 'barre'],
            ['28.1.216 après 2013', 'TEE_71X438_5O_13', 'barre'],
            ['28.1.217', 'TEE_71X51_5O_13', 'barre'],
            ['28.1.218', 'TEE_71X50_5O_13', 'barre'],
            ['28.1.219', 'TEE_71X55_5O_13', 'barre'],
            ['28.1.221', 'TEE_71X62_5O_13', 'barre'],
            ['28.1.223', 'TEE_71X60_5O_13', 'barre'],
            ['28.1.231', 'TEE_71X67_5O_13', 'barre'],
            ['28.1.232', 'TEE_71X64_5O_13', 'barre'],
            ['28.1.241', 'TEE_71X73_5O_13', 'barre'],
            ['28.1.302', 'TEE_87X31_5O_13', 'barre'],
            ['28.1.309', 'TEE_87X42_5O_13', 'barre'],
            ['28.1.310', 'TEE_87X30_5O_13', 'barre'],
            ['28.1.311', 'TEE_87X57_5O_13', 'barre'],
            ['28.1.313', 'TEE_87X40_5O_13', 'barre'],
            ['28.1.314', 'TEE_87X36_5O_13', 'barre'],
            ['28.1.315', 'TEE_87X47_5O_13', 'barre'],
            ['28.1.316', 'TEE_87X44_5O_13', 'barre'],
            ['28.1.317', 'TEE_87X51_5O_13', 'barre'],
            ['28.1.318', 'TEE_87X50_5O_13', 'barre'],
            ['28.1.319', 'TEE_87X55_5O_13', 'barre'],
            ['28.1.401', 'TE_114X23_14O_12', 'barre']
        ],

        map: [
            ['ME80C', 'TE_122X20_14O', 'cordon'],
            ['TE60', 'TE_57X21_7O_P', 'cordon'],
            ['ME130', 'TE_58X28_7O', 'cordon'],
            ['MT160', 'TE_58X34_7O', 'cordon'],
            ['ME180/80L', 'TE_58X365_7O', 'cordon'],
            ['ME190', 'TE_58X44_7O', 'cordon'],
            ['E40', 'TE_59X21_7O', 'cordon'],
            ['E50', 'TE_78X21_7O', 'cordon'],
            ['ME80M', 'TE_78X28_8O', 'cordon'],
            ['MT/ME120/200', 'TE_78X36_8O', 'cordon'],
            ['ME140/280', 'TE_78X45_8O', 'cordon']
        ],

        polin: [
            ['voie 600, sole 1260', 'TEE_56X34_7O_33', 'barre'],
            ['voie 600, sole 1400', 'TEE_56X37_7O_33', 'barre'],
            ['voie 600, sole 1700', 'TEE_56X43_7O_33', 'barre'],
            ['voie 600, sole 2140', 'TEE_56X52_7O_33', 'barre'],
            ['voie 750, sole 1260', 'TEE_72X34_7O_33', 'barre'],
            ['voie 750, sole 1400', 'TEE_72X37_7O_33', 'barre'],
            ['voie 750, sole 1700', 'TEE_72X43_7O_33', 'barre'],
            ['voie 750, sole 2140', 'TEE_72X52_7O_33', 'barre'],
            ['voie 750, sole 2580', 'TEE_72X61_7O_33', 'barre'],
            ['voie 840, sole 1260', 'TEE_78X34_7O_33', 'barre'],
            ['voie 840, sole 1400', 'TEE_78X37_7O_33', 'barre'],
            ['voie 840, sole 1700', 'TEE_78X43_7O_33', 'barre'],
            ['voie 840, sole 2140', 'TEE_78X52_7O_33', 'barre'],
            ['voie 840, sole 2580', 'TEE_78X61_7O_33', 'barre']
        ],

        real: [
            ['AT4c 6.20', 'TE_56X35_7O_13_E', 'barre'],
            ['AT5c 7.70', 'TE_56X35_7O_13_E', 'barre'],
            ['AE3C 4.60', 'TE_56X35_7O_13_E', 'barre'],
            ['AE4c 6.20', 'TE_56X35_7O_13_E', 'barre'],
            ['AE5c 7.70', 'TE_56X35_7O_13_E', 'barre'],
            ['AE3c 5.10', 'TE_56X41_7O_13_E', 'barre'],
            ['AE4c 6.80', 'TE_56X41_7O_13_E', 'barre'],
            ['AE5C 8.60', 'TE_56X41_7O_13_E', 'barre'],
            ['AT4c 8.20', 'TE_56X43_7O_13_E', 'barre'],
            ['AT5c 10.20', 'TE_56X43_7O_13_E', 'barre'],
            ['AE3C 6.10', 'TE_56X43_7O_13_E', 'barre'],
            ['AE4c 8.20', 'TE_56X43_7O_13_E', 'barre'],
            ['AE5c 10.20', 'TE_56X43_7O_13_E', 'barre'],
            ['AE3c 6.30', 'TE_56X47_7O_13_E', 'barre'],
            ['AE4c 8.40', 'TE_56X47_7O_13_E', 'barre'],
            ['AE5C 10.50', 'TE_56X47_7O_13_E', 'barre'],
            ['AE3c 6.90', 'TE_56X50_7O_13_E', 'barre'],
            ['AE4c 9.20', 'TE_56X50_7O_13_E', 'barre'],
            ['AE5C 11.50', 'TE_56X50_7O_13_E', 'barre'],
            ['AT4c 10.20', 'TE_56X51_7O_13_E', 'barre'],
            ['AT5c 12.70', 'TE_56X51_7O_13_E', 'barre'],
            ['AE3C 7.60', 'TE_56X51_7O_13_E', 'barre'],
            ['AE4c 10.20', 'TE_56X51_7O_13_E', 'barre'],
            ['AE5c 12.70', 'TE_56X51_7O_13_E', 'barre'],
            ['AE3c 8.10', 'TE_56X57_7O_13_E', 'barre'],
            ['AE4c 10.80', 'TE_56X57_7O_13_E', 'barre'],
            ['AE5c 13.50', 'TE_56X57_7O_13_E', 'barre'],
            ['AE3c 9.10', 'TE_56X59_7O_13_E', 'barre'],
            ['AE4c 12.10', 'TE_56X59_7O_13_E', 'barre'],
            ['AE5c 15.20', 'TE_56X59_7O_13_E', 'barre'],
            ['AE3c 9.30', 'TE_56X63_7O_13_E', 'barre'],
            ['AE4c 12.40', 'TE_56X63_7O_13_E', 'barre'],
            ['AE5c 15.40', 'TE_56X63_7O_13_E', 'barre'],
            ['FE3C 5.80', 'TE_72X34_7O_13_E', 'barre'],
            ['FE4C 7.80', 'TE_72X34_7O_13_E', 'barre'],
            ['FE5C 9.70', 'TE_72X34_7O_13_E', 'barre'],
            ['FE3C 7.70', 'TE_72X42_7O_13_E', 'barre'],
            ['FE4C 10.30', 'TE_72X42_7O_13_E', 'barre'],
            ['FE5C 12.90', 'TE_72X42_7O_13_E', 'barre'],
            ['FE3C 9.60', 'TE_72X50_7O_13_E', 'barre'],
            ['FE4C 12.80', 'TE_72X50_7O_13_E', 'barre'],
            ['FE5C 16.00', 'TE_72X50_7O_13_E', 'barre'],
            ['FE3C 11.50', 'TE_72X58_7O_13_E', 'barre'],
            ['FE4C 15.30', 'TE_72X58_7O_13_E', 'barre'],
            ['FE5C 19.10', 'TE_72X58_7O_13_E', 'barre'],
            ['ZE5c 4.10', 'TE_76X29_7O_13_E', 'barre'],
            ['ZE3c 3.10', 'TE_76X35_7O_13_E', 'barre'],
            ['ZT4c 4.10', 'TE_76X35_7O_13_E', 'barre'],
            ['ZT5c 5.10', 'TE_76X35_7O_13_E', 'barre'],
            ['ZE4c 4.10', 'TE_76X35_7O_13_E', 'barre'],
            ['ZE5c 5.10', 'TE_76X35_7O_13_E', 'barre'],
            ['ZE3c 3.40', 'TE_76X41_7O_13_E', 'barre'],
            ['ZE4c 4.50', 'TE_76X41_7O_13_E', 'barre'],
            ['ZE5c 5.70', 'TE_76X41_7O_13_E', 'barre'],
            ['ZE3c 4.00', 'TE_76X43_7O_13_E', 'barre'],
            ['ZT4c 5.40', 'TE_76X43_7O_13_E', 'barre'],
            ['ZT5c 6.80', 'TE_76X43_7O_13_E', 'barre'],
            ['ZE4c 5.40', 'TE_76X43_7O_13_E', 'barre'],
            ['ZE5c 6.80', 'TE_76X43_7O_13_E', 'barre'],
            ['ZE3c 4.20', 'TE_76X47_7O_13_E', 'barre'],
            ['ZE4c 5.60', 'TE_76X47_7O_13_E', 'barre'],
            ['ZE5c 7.00', 'TE_76X47_7O_13_E', 'barre'],
            ['ZE3c 4.60', 'TE_76X50_7O_13_E', 'barre'],
            ['ZE4c 6.10', 'TE_76X50_7O_13_E', 'barre'],
            ['ZE5c 7.60', 'TE_76X50_7O_13_E', 'barre'],
            ['ZE3c 5.00', 'TE_76X51_7O_13_E', 'barre'],
            ['ZT4c 6.70', 'TE_76X51_7O_13_E', 'barre'],
            ['ZT5c 8.40', 'TE_76X51_7O_13_E', 'barre'],
            ['ZE4c 6.70', 'TE_76X51_7O_13_E', 'barre'],
            ['ZE5c 8.40', 'TE_76X51_7O_13_E', 'barre'],
            ['ZE3c 5.40', 'TE_76X57_7O_13_E', 'barre'],
            ['ZE4c 7.10', 'TE_76X57_7O_13_E', 'barre'],
            ['ZE5c 8.90', 'TE_76X57_7O_13_E', 'barre'],
            ['ZE3c 6.00', 'TE_76X59_7O_13_E', 'barre'],
            ['ZE4c 8.00', 'TE_76X59_7O_13_E', 'barre'],
            ['ZE5c 10.00', 'TE_76X59_7O_13_E', 'barre']
        ],


        tagliavini: [
            ['ET73/C pour élévateur intégré', 'TE_71X43_7O_13', 'barre'],
            ['ET73/C pour élévateur non intégré', 'TE_71X44_7O_33', 'barre'],
            ['ET73/M pour élévateur intégré', 'TE_71X51_7O_13', 'barre'],
            ['ET73/M pour élévateur non intégré', 'TE_71X52_7O_13', 'barre'],
            ['ET73/L pour élévateur intégré', 'TE_71X598_7O_13', 'barre'],
            ['ET73/L pour élévateur non intégré', 'TE_71X60_7O_13', 'barre'],
            ['ET74/C pour élévateur intégré', 'TE_71X43_7O_13', 'barre'],
            ['ET74/C pour élévateur non intégré', 'TE_71X44_7O_33', 'barre'],
            ['ET74/M pour élévateur intégré', 'TE_71X51_7O_13', 'barre'],
            ['ET74/M pour élévateur non intégré', 'TE_71X52_7O_13', 'barre'],
            ['ET74/L pour élévateur intégré', 'TE_71X598_7O_13', 'barre'],
            ['ET74/L pour élévateur non intégré', 'TE_71X60_7O_13', 'barre'],
            ['ET93/SC', 'TE_87X36_7O_33', 'barre'],
            ['ET93/C pour élévateur intégré', 'TE_87X43_7O_13', 'barre'],
            ['ET93/C pour élévateur non intégré', 'TE_87X44_7O_13', 'barre'],
            ['ET93/M pour élévateur intégré', 'TE_87X51_7O_13', 'barre'],
            ['ET93/M pour élévateur non intégré', 'TE_87X52_7O_13', 'barre'],
            ['ET93/L pour élévateur intégré', 'TE_87X59_7O_13', 'barre'],
            ['ET93/L pour élévateur non intégré', 'TE_87X60_7O_13', 'barre'],
            ['ET94/SC', 'TE_87X36_7O_33', 'barre'],
            ['ET94/C pour élévateur intégré', 'TE_87X43_7O_13', 'barre'],
            ['ET94/C pour élévateur non intégré', 'TE_87X44_7O_13', 'barre'],
            ['ET94/M pour élévateur intégré', 'TE_87X51_7O_13', 'barre'],
            ['ET94/M pour élévateur non intégré', 'TE_87X52_7O_13', 'barre'],
            ['ET94/L pour élévateur intégré', 'TE_87X59_7O_13', 'barre'],
            ['ET94/L pour élévateur non intégré', 'TE_87X60_7O_13', 'barre'],
            ['ET95/SC', 'TE_87X36_7O_33', 'barre'],
            ['ET95/C pour élévateur intégré', 'TE_87X43_7O_13', 'barre'],
            ['ET95/C pour élévateur non intégré', 'TE_87X44_7O_13', 'barre'],
            ['ET95/M pour élévateur intégré', 'TE_87X51_7O_13', 'barre'],
            ['ET95/M pour élévateur non intégré', 'TE_87X52_7O_13', 'barre'],
            ['ET95/L pour élévateur intégré', 'TE_87X59_7O_13', 'barre'],
            ['ET95/L pour élévateur non intégré', 'TE_87X60_7O_13', 'barre'],
            ['ET123/SC', 'TE_57X362_7O_13', 'barre'],
            ['ET123/C pour élévateur intégré', 'TE_57X438_7O_13', 'barre'],
            ['ET123/C pour élévateur non intégré', 'TE_57X444_7O_13', 'barre'],
            ['ET123/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET123/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET123/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET123/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET124/SC', 'TE_57X362_7O_33', 'barre'],
            ['ET124/C pour élévateur intégré', 'TE_57X438_7O_13', 'barre'],
            ['ET124/C pour élévateur non intégré', 'TE_57X444_7O_13', 'barre'],
            ['ET124/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET124/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET124/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET124/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET125/SC', 'TE_57X362_7O_33', 'barre'],
            ['ET125/C pour élévateur intégré', 'TE_57X438_7O_13', 'barre'],
            ['ET125/C pour élévateur non intégré', 'TE_57X444_7O_13', 'barre'],
            ['ET125/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET125/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET125/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET125/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET153/C pour élévateur intégré', 'TE_71X43_7O_13', 'barre'],
            ['ET153/C pour élévateur non intégré', 'TE_71X44_7O_33', 'barre'],
            ['ET153/M pour élévateur intégré', 'TE_71X51_7O_13', 'barre'],
            ['ET153/M pour élévateur non intégré', 'TE_71X52_7O_13', 'barre'],
            ['ET153/L pour élévateur intégré', 'TE_71X598_7O_13', 'barre'],
            ['ET153/L pour élévateur non intégré', 'TE_71X60_7O_13', 'barre'],
            ['ET154/C pour élévateur intégré', 'TE_71X43_7O_13', 'barre'],
            ['ET154/C pour élévateur non intégré', 'TE_71X44_7O_33', 'barre'],
            ['ET154/M pour élévateur intégré', 'TE_71X51_7O_13', 'barre'],
            ['ET154/M pour élévateur non intégré', 'TE_71X52_7O_13', 'barre'],
            ['ET154/L pour élévateur intégré', 'TE_71X598_7O_13', 'barre'],
            ['ET154/L pour élévateur non intégré', 'TE_71X60_7O_13', 'barre'],
            ['ET155/C pour élévateur intégré', 'TE_71X43_7O_13', 'barre'],
            ['ET155/C pour élévateur non intégré', 'TE_71X44_7O_33', 'barre'],
            ['ET155/M pour élévateur intégré', 'TE_71X51_7O_13', 'barre'],
            ['ET155/M pour élévateur non intégré', 'TE_71X52_7O_13', 'barre'],
            ['ET155/L pour élévateur intégré', 'TE_71X598_7O_13', 'barre'],
            ['ET155/L pour élévateur non intégré', 'TE_71X60_7O_13', 'barre'],
            ['ET183/C pour élévateur intégré', 'TE_57X438_7O_13', 'barre'],
            ['ET183/C pour élévateur non intégré', 'TE_57X444_7O_13', 'barre'],
            ['ET183/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET183/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET183/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET183/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET184/C pour élévateur intégré', 'TE_57X438_7O_13', 'barre'],
            ['ET184/C pour élévateur non intégré', 'TE_57X444_7O_13', 'barre'],
            ['ET184/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET184/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET184/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET184/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET185/C pour élévateur intégré', 'TE_57X438_7O_13', 'barre'],
            ['ET185/C pour élévateur non intégré', 'TE_57X444_7O_13', 'barre'],
            ['ET185/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET185/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET185/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET185/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET243/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET243/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET243/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET243/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre'],
            ['ET244/M pour élévateur intégré', 'TE_57X518_7O_13', 'barre'],
            ['ET244/M pour élévateur non intégré', 'TE_57X524_7O_13', 'barre'],
            ['ET244/L pour élévateur intégré', 'TE_57X598_7O_13', 'barre'],
            ['ET244/L pour élévateur non intégré', 'TE_57X604_7O_13', 'barre']
        ],

        technodif: [
            ['V60D900', 'TE_58X13_3S_B', 'sangle'],
            ['V60D1250', 'TE_58X16_3S_B', 'sangle'],
            ['V60D1400', 'TE_58X18_3S_B', 'sangle'],
            ['V60D1650', 'TE_58X20_3S_B', 'sangle'],
            ['V60D1850', 'TE_58X22_3S_B', 'sangle'],
            ['V60D2050', 'TE_58X24_3S_B', 'sangle'],
            ['V60D2250', 'TE_58X26_3S_B', 'sangle'],
            ['V60D2450', 'TE_58X28_3S_B', 'sangle'],
            ['V75D800', 'TE_70X12_3S_B', 'sangle'],
            ['V75D1250', 'TE_70X16_3S_B', 'sangle'],
            ['V75D1400', 'TE_70X18_3S_B', 'sangle'],
            ['V75D1650', 'TE_70X20_3S_B', 'sangle'],
            ['V75D1850', 'TE_70X226_3S_B', 'sangle'],
            ['V75D2050', 'TE_70X246_3S_B', 'sangle'],
            ['V75D2250', 'TE_70X266_3S_B', 'sangle'],
            ['V75D2450', 'TE_70X28_3S_B', 'sangle'],
            ['V90D900', 'TE_87X13_3S_B', 'sangle'],
            ['V90D1250', 'TE_87X16_3S_B', 'sangle'],
            ['V90D1400', 'TE_87X18_3S_B', 'sangle'],
            ['V90D1650', 'TE_87X20_3S_B', 'sangle'],
            ['V90D1850', 'TE_87X22_3S_B', 'sangle'],
            ['V90D2050', 'TE_87X24_3S_B', 'sangle'],
            ['V90D2250', 'TE_87X26_3S_B', 'sangle'],
            ['V90D2450', 'TE_87X28_3S_B', 'sangle']
        ]
    }


    console.log(teInfo)
    console.log(teList)
    console.log("slide", slide)

    const searchWithEA = (ea) => {
        ea = Number(ea)
        switch (teInfo.closing) {
            case 'cordon':
                const lengthCalculCordon = ea * 2 - 90
                setTeInfo({ ...teInfo, eaLength: ea, length: lengthCalculCordon })
                break;
            case 'sangle':
                const lengthCalculSangle = ea + 200
                setTeInfo({ ...teInfo, length: lengthCalculSangle })
                break;
            case 'barre':
                const lengthCalculBarre = ea * 2 + 120
                setTeInfo({ ...teInfo, length: lengthCalculBarre })
                break;
            default:
                return
        }
    }

    const searchMatch = () => {
        const teMatched = teInfo.brand === 'inconnu' ? teList.filter(te =>
            te.closing === teInfo.closing &&
            te.width < teInfo.widthMax &&
            te.width >= teInfo.width && te.length > Number(teInfo.length) - 50 && te.length < Number(teInfo.length) + 50) : teList.filter(te =>
                te.brand.toLowerCase() === teInfo.brand &&
                te.closing === teInfo.closing &&
                te.width < teInfo.widthMax &&
                te.width >= teInfo.width && te.length > Number(teInfo.length) - 50 && te.length < Number(teInfo.length) + 50)
        setTeListFiltered(teMatched)
    }


    const handleInfoChange = (e) => {
        const { name, value } = e.target;
        setTeInfo({ ...teInfo, [name]: value });

    };

    const handleValidateClick = () => {

        // SLIDE 1 BRAND
        if (slide === 1 && teInfo.brand === '') {
            alert('Veuillez choisir une marque de four')
        } else if (slide === 1) {
            switch (teInfo.brand) {
                case 'abry':
                    setSlide(slide + 2)
                    break;
                case 'eurofours':
                    setSlide(slide + 2)
                    break;
                case 'pavailler':
                    setSlide(slide + 2)
                    break;
                case 'inconnu':
                    setSlide(slide + 2)
                    break;
                default:
                    setSlide(slide + 1)
            }
        }
        // SLIDE 2 REFERENCE

        if (slide === 2 && teInfo.reference === '') {
            alert('Veuillez faire un choix avant de valider')
        } else if (slide === 2 && teInfo.reference === 'none') {
            setSlide(slide + 1)
        } else if (slide === 2) {
            setTeListFiltered(teList.filter(te => (te.reference === teInfo.reference)))
            setSlide("result")
        }


        // SLIDE 3 CLOSING

        if (slide === 3 && teInfo.closing === '') {
            alert('Veuillez choisir un mode de fermeture')
        } else if (slide === 3) {
            setSlide(slide + 1)
        }

        // SLIDE 4 WIDTH

        if (slide === 4 && teInfo.width === '') {
            alert('Veuillez renseigner la largeur de la toile')
        } else if (slide === 4 && teInfo.width < 450 || teInfo.width > 950) {
            alert('La largeur de la toile doit être comprise entre 450mm et 950mm')
        } else if (slide === 4) {
            setTeInfo({ ...teInfo, widthMax: Number(teInfo.width) + 20 })
            setSlide(slide + 1)
        }

        // SLIDE 5 LENGTH

        if (slide === 5 && teInfo.eaLength === '') {
            alert('Veuillez renseigner la longueur de rouleau à rouleau')
        } else if (slide === 5 && teInfo.eaLength < 800 || teInfo.eaLength > 5000) {
            alert('La longueur de rouleau à rouleau doit être comprise entre 800mm et 5000mm')
        } else if (slide === 5) {
            searchWithEA(teInfo.eaLength)
            searchMatch()
            if (teListFiltered.length === 0) {
                switch (teInfo.closing) {
                    case 'barre':
                        setSlide(slide + 1)
                        break;
                    case 'cordon':
                        setSlide(slide + 2)
                        break;
                    case 'sangle':
                        setSlide(slide + 3)
                        break;
                    default:
                        return
                }

            } else {
                setSlide('proposeResult')
            }
        }

        // SLIDE 6 BARRE

        if (slide === 6 && teInfo.row === '') {
            alert("Veuillez renseigner le nombre de rangées d'oeillets")
        } else if (slide === 6 && teInfo.hole === '') {
            alert("Veuillez renseigner le nombre d'oeillets par rangée")
        } else if (slide === 6 && teInfo.sameOrNot === '') {
            alert("Veuillez renseigner si les entraxes sont identiques ou non")
        } else if (slide === 6 && teInfo.sameOrNot === 'same' && teInfo.entraxe === '') {
            alert("Veuillez renseigner l'entraxe oeillets")
        } else if (slide === 6 && teInfo.sameOrNot === 'not') {
            const totalEa = Number(teInfo.entraxeA) + Number(teInfo.entraxeB) + Number(teInfo.entraxeC) + Number(teInfo.entraxeD) + Number(teInfo.entraxeE) + Number(teInfo.entraxeF) + Number(teInfo.entraxeG) + Number(teInfo.entraxeH)
            if (teInfo.width - totalEa < 20) {
                alert("Le total des entraxes indiqués est trop important par rapport à la largeur de la toile, il faut au minimium 10mm de chaque côté de la toile")
            } else if (teInfo.width - totalEa > 90) {
                alert("Le total des entraxes indiqués est trop faible par rapport à la largeur de la toile, il faut au maximum 45mm de chaque côté de la toile")
            } else {
                const allHole = (teInfo.row.split('+').reduce((a, b) => parseInt(a) + parseInt(b), 0)) * teInfo.hole
                const priceTE = barre(teInfo.length, allHole)
                setTeInfo({ ...teInfo, t1: priceTE })
                setSlide('customResult')
            }
        } else if (slide === 6 && teInfo.sameOrNot === 'same') {
            const totalEa = Number(teInfo.entraxe) * ((Number(teInfo.hole) - 1))
            if (teInfo.width - totalEa < 20) {
                alert("Le total des entraxes indiqués est trop important par rapport à la largeur de la toile, il faut au minimium 10mm de chaque côté de la toile")
            } else if (teInfo.width - totalEa > 90) {
                alert("Le total des entraxes indiqués est trop faible par rapport à la largeur de la toile, il faut au maximum 45mm de chaque côté de la toile")
            } else {
                const allHole = (teInfo.row.split('+').reduce((a, b) => parseInt(a) + parseInt(b), 0)) * teInfo.hole
                const priceTE = barre(teInfo.length, allHole)
                setTeInfo({ ...teInfo, t1: priceTE })
                setSlide('customResult')
            }
        }


        // SLIDE 7 CORDON

        if (slide === 7 && teInfo.holeForBar === '') {
            alert("Veuillez renseigner le nombre d'oeillets sur le passage de barre")
        } else if (slide === 7 && Number(teInfo.holeForBar) > 1 && teInfo.holeForBarEntraxe === '') {
            alert("Veuillez renseigner l'entraxe des oeillets sur le passage de barre")
        } else if (slide === 7 && Number(teInfo.holeForBar) > 1 && Number(teInfo.holeForBarEntraxe) > 1) {
            const totalEa = Number(teInfo.holeForBarEntraxe) * ((Number(teInfo.holeForBar) - 1))
            if (teInfo.width - totalEa < 20) {
                alert("Le total des entraxes indiqués est trop important par rapport à la largeur de la toile, il faut au minimium 10mm de chaque côté de la toile")
            } else if (teInfo.width - totalEa > 90) {
                alert("Le total des entraxes indiqués est trop faible par rapport à la largeur de la toile, il faut au maximum 45mm de chaque côté de la toile")
            } else {
                const holeRope = (Math.floor((Number(teInfo.width) / 90)) + 1)
                const holeTotal = (holeRope * 2) + Number(teInfo.holeForBar);
                const priceTE = cordon(teInfo.length, holeTotal)
                setTeInfo({ ...teInfo, t1: priceTE, holeForRope: holeRope })
                setSlide('customResult')
            }
        } else if (slide === 7 && Number(teInfo.holeForBar) <= 1) {
            const holeRope = (Math.floor((Number(teInfo.width) / 90)) + 1)
            const holeTotal = (holeRope * 2) + Number(teInfo.holeForBar);
            const priceTE = cordon(teInfo.length, holeTotal)
            setTeInfo({ ...teInfo, t1: priceTE, holeForRope: holeRope })
            setSlide('customResult')
        }

        // SLIDE 8 SANGLE

        if (slide === 8 && teInfo.sangle === '') {
            alert("Veuillez renseigner le nombre de sangle")
        } else if (slide === 8 && teInfo.sangle === 'other') {
            if (teInfo.sangleNS === '') {
                alert("Veuillez renseigner le nombre de sangle souhaité")
            } else {
                setTeInfo({ ...teInfo, sangle: teInfo.sangleNS })
            }
        } else if (slide === 8 && teInfo.holeForBar === '') {
            alert("Veuillez renseigner le nombre d'oeillets sur le passage de barre")
        } else if (slide === 8 && Number(teInfo.holeForBar) > 1 && teInfo.holeForBarEntraxe === '') {
            alert("Veuillez renseigner l'entraxe des oeillets sur le passage de barre")
        } else if (slide === 8 && Number(teInfo.holeForBar) > 1 && Number(teInfo.holeForBarEntraxe) > 1) {
            const totalEa = Number(teInfo.holeForBarEntraxe) * ((Number(teInfo.holeForBar) - 1))
            if (teInfo.width - totalEa < 20) {
                alert("Le total des entraxes indiqués est trop important par rapport à la largeur de la toile, il faut au minimium 10mm de chaque côté de la toile")
            } else if (teInfo.width - totalEa > 90) {
                alert("Le total des entraxes indiqués est trop faible par rapport à la largeur de la toile, il faut au maximum 45mm de chaque côté de la toile")
            } else {
                const priceTE = sangle(teInfo.length, teInfo.sangle, teInfo.holeForBar)
                setTeInfo({ ...teInfo, t1: priceTE })

                setSlide('customResult')
            }
        } else if (slide === 8 && Number(teInfo.holeForBar) <= 1) {
            const priceTE = sangle(teInfo.length, teInfo.sangle, teInfo.holeForBar)
            setTeInfo({ ...teInfo, t1: priceTE })
            setSlide('customResult')
        }
    }



    const handleReturn = () => {
        if (slide === 1) return
        if (slide === 3) {
            setSlide(slide - 2)
            return
        }
        setSlide(slide - 1)
    }

    if (!isLoaded) {
        return <div className="loading">Chargement...</div>
    }

    return (
        <main className='te-tool'>

            <h2>{!isNaN(slide) ? 'Définissez facilement votre toile enfourneur en répondant aux questions suivantes :' : 'Résultat de votre recherche :'}</h2>

            <div className="te-tool-container">
                {slide === 1 &&
                    <div className='each-slide-effect'>
                        <label htmlFor="brand">Marque du Four</label>
                        <select name="brand" id="brand" defaultValue={teInfo.brand} onChange={handleInfoChange}>
                            <option disabled value=''>Choisissez une marque de four</option>
                            <option value="abry">Abry</option>
                            <option value="bongard">Bongard</option>
                            <option value="eurofours">Eurofours/Jolivet</option>
                            <option value="fringand">Fringand</option>
                            <option value="map">Map</option>
                            <option value="pavailler">Pavailler</option>
                            <option value="polin">Polin</option>
                            <option value="real">Real Forni</option>
                            <option value="tagliavini">Tagliavini</option>
                            <option value="technodif">Technodif</option>
                            <option value="inconnu">Autre ou inconnu</option>
                        </select>
                    </div>
                }

                {slide === 2 &&
                    <div className='each-slide-effect each-slide-effect-reference'>
                        <h4>Choisissez une référence :</h4>
                        <ul className="te-tool-input-reference-container">
                            <input
                                type="radio"
                                value='none'
                                id='none'
                                name="reference"
                                onChange={handleInfoChange} />
                            <label htmlFor='none' className="reference-radio-label"> Je n'ai pas de référence
                            </label>
                            {reference[teInfo.brand].map((ref, index) => {
                                return (
                                    <li key={index}>
                                        <input
                                            type="radio"
                                            value={ref[1]}
                                            name="reference"
                                            id={ref[1]}

                                            onChange={handleInfoChange} />
                                        <label htmlFor={ref[1]} className="reference-radio-label" >{ref[0]}
                                        </label>
                                    </li>
                                )
                            }
                            )}
                        </ul>
                    </div>

                }


                {slide === 3 &&
                    <div className='each-slide-effect each-slide-effect-closing'>
                        <h4>Choisissez le mode de fermeture :</h4>
                        <div className="te-tool-input-container">
                            <h5>Fermeture à barre</h5>
                            <input type="radio" value='barre' name="closing" id="barre" onChange={handleInfoChange} />
                            <label htmlFor="barre" className="radio-label">
                                <img src="/te-tool/barre.jpg" alt="photo de de toile fermeture à barre" />

                            </label>
                        </div>
                        <div className="te-tool-input-container">
                            <h5>Fermeture à cordon</h5>
                            <input type="radio" value='cordon' name="closing" id="cordon" onChange={handleInfoChange} />
                            <label htmlFor="cordon" className="radio-label">
                                <img src="/te-tool/cordon.jpg" alt="photo de de toile fermeture à cordon" />
                            </label>
                        </div>
                        <div className="te-tool-input-container">
                            <h5>Fermeture à sangle</h5>
                            <input type="radio" value='sangle' name="closing" id="sangle" onChange={handleInfoChange} />
                            <label htmlFor="sangle" className="radio-label">
                                <img src="/te-tool/sangle.jpg" alt="photo de de toile fermeture à sangle" />
                            </label>
                        </div>
                    </div>
                }
                {slide === 4 &&
                    <div className='each-slide-effect'>
                        <label htmlFor="width">largeur de la toile en mm</label>
                        <input type="number" name='width' placeholder="ex: 700" defaultValue={teInfo.width} onChange={handleInfoChange} />
                    </div>
                }
                {slide === 5 &&
                    <div className='each-slide-effect'>
                        <label htmlFor="eaLength">Longueur de rouleau à rouleau en mm</label>
                        <input type="number" name='eaLength' defaultValue={teInfo.eaLength} placeholder="ex: 2000" onChange={handleInfoChange} />
                    </div>
                }
                {
                    slide === 6 && teInfo.closing === 'barre' &&
                    <div className="each-slide-effect">
                        <h3>Veuillez nous communiquer les infos ci-dessous</h3>
                        <hr />
                        <h4>Nombre de rangées d'oeillets</h4>
                        <div className="slide-section">
                            <input type="radio" value="1+3" name='row' id="1+3" onChange={handleInfoChange} />
                            <label htmlFor='1+3'>1+3</label>
                            <input type="radio" value="1+2" name='row' id="1+2" onChange={handleInfoChange} />
                            <label htmlFor='1+2'>1+2</label>
                            <input type="radio" value="2+2" name='row' id="2+2" onChange={handleInfoChange} />
                            <label htmlFor='2+2'>2+2</label>
                            <input type="radio" value="2+3" name='row' id="2+3" onChange={handleInfoChange} />
                            <label htmlFor='2+3'>2+3</label>
                            <input type="radio" value="3+3" name='row' id="3+3" onChange={handleInfoChange} />
                            <label htmlFor='3+3'>3+3</label>
                        </div>
                        <hr />
                        {teInfo.row &&
                            <>
                                <h4>Nombre d'oeillets par rangée</h4>
                                <div className="slide-section">
                                    <input type="radio" value='3' name="hole" id="3" onChange={handleInfoChange} />
                                    <label htmlFor='3'> 3 oeillets par rangées
                                    </label>
                                    <input type="radio" value='4' name="hole" id="4" onChange={handleInfoChange} />
                                    <label htmlFor='4'> 4 oeillets par rangées
                                    </label>
                                    <input type="radio" value='5' name="hole" id="5" onChange={handleInfoChange} />
                                    <label htmlFor='5'> 5 oeillets par rangées
                                    </label>
                                    <input type="radio" value='6' name="hole" id="6" onChange={handleInfoChange} />
                                    <label htmlFor='6'> 6 oeillets par rangées
                                    </label>
                                    <input type="radio" value='7' name="hole" id="7" onChange={handleInfoChange} />
                                    <label htmlFor='7'> 7 oeillets par rangées
                                    </label>
                                    <input type="radio" value='8' name="hole" id="8" onChange={handleInfoChange} />
                                    <label htmlFor='8'> 8 oeillets par rangées
                                    </label>
                                    <input type="radio" value='9' name="hole" id="9" onChange={handleInfoChange} />
                                    <label htmlFor='9'> 9 oeillets par rangées
                                    </label>
                                </div>
                                <hr />
                                {teInfo.hole !== '' &&
                                    <>
                                        <h4>Les entraxes sont-ils tous identiques?</h4>
                                        <div className="slide-section slide-section-same-ea">
                                            <input type="radio" name="sameOrNot" value="same" id="same" onChange={handleInfoChange} />
                                            <label htmlFor="same">Oui, tous identiques</label>

                                            <input type="radio" name="sameOrNot" value="not" id="not" onChange={handleInfoChange} />
                                            <label htmlFor="not">Non, ils sont différents</label>
                                        </div>
                                    </>
                                }
                                <hr />
                                {teInfo.sameOrNot !== '' &&
                                    <img className='canvas-draw' src={`/te-tool/${teInfo.hole}o.png`} alt={`schema de toile à ${teInfo.hole} oeillets`} />
                                }
                                <hr />
                                {
                                    teInfo.sameOrNot === 'same' &&
                                    <div className="entraxe-input-container">
                                        <label htmlFor="entraxe">Entraxe en mm</label>
                                        <input type="number" name="entraxe" id="entraxe" placeholder={`ex: ${((teInfo.width - 40) / (teInfo.hole - 1)).toFixed(0)}`} onChange={handleInfoChange} />
                                    </div>
                                }


                                {teInfo.sameOrNot === 'not' && (
                                    <div className="entraxe-input-container">
                                        {Array.from({ length: teInfo.hole - 1 }, (_, i) => (
                                            <div key={`entraxe${i}`}>
                                                <label htmlFor={`entraxe${i}`}>Entraxe {String.fromCharCode(65 + i)} en mm</label>
                                                <input
                                                    type="number"
                                                    name={`entraxe${String.fromCharCode(65 + i)}`}
                                                    id={`entraxe${i}`}
                                                    placeholder={`ex: ${((teInfo.width - 40) / (teInfo.hole - 1)).toFixed(0)}`}
                                                    onChange={handleInfoChange}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        }



                    </div>
                }
                {
                    slide === 7 &&
                    <div className="each-slide-effect">
                        <h4>Nombre d'oeillets sur passage de barre?</h4>
                        <div className="slide-section">
                            <input type="radio" value='0' name="holeForBar" id="0" onChange={handleInfoChange} />
                            <label htmlFor='0'> pas d'oeillet sur passage de barre</label>
                            <input type="radio" value='1' name="holeForBar" id="1" onChange={handleInfoChange} />
                            <label htmlFor='1'> 1 oeillets sur passage de barre</label>
                            <input type="radio" value='2' name="holeForBar" id="2" onChange={handleInfoChange} />
                            <label htmlFor='2'> 2 oeillets sur passage de barre</label>
                            <input type="radio" value='3' name="holeForBar" id="3" onChange={handleInfoChange} />
                            <label htmlFor='3'> 3 oeillets sur passage de barre</label>
                            <input type="radio" value='4' name="holeForBar" id="4" onChange={handleInfoChange} />
                            <label htmlFor='4'> 4 oeillets sur passage de barre</label>
                            <input type="radio" value='5' name="holeForBar" id="5" onChange={handleInfoChange} />
                            <label htmlFor='5'> 5 oeillets sur passage de barre</label>
                            <input type="radio" value='6' name="holeForBar" id="6" onChange={handleInfoChange} />
                            <label htmlFor='6'> 6 oeillets sur passage de barre</label>
                            <input type="radio" value='7' name="holeForBar" id="7" onChange={handleInfoChange} />
                            <label htmlFor='7'> 7 oeillets sur passage de barre</label>
                        </div>


                        {teInfo.holeForBar !== '' && Number(teInfo.holeForBar) > 1 &&

                            <label htmlFor='holeForBarEntraxe'><h4>Entraxe oeillets sur passage de barre en mm</h4>
                                <input type='number' name='holeForBarEntraxe' placeholder={`ex: ${((teInfo.width - 40) / (teInfo.holeForBar - 1)).toFixed(0)}`} onChange={handleInfoChange} />
                            </label>
                        }
                    </div>
                }
                {
                    slide === 8 &&
                    <div className="each-slide-effect">
                        <h4>Nombre de sangles</h4>
                        <div className="slide-section">
                            <input type="radio" value='3' name="sangle" id="3" onChange={handleInfoChange} />
                            <label htmlFor='3'> 3 sangles (standard)</label>
                            <input type="radio" value='other' name="sangle" id="other" onChange={handleInfoChange} />
                            <label htmlFor='other'> autres nombre de sangles</label>
                        </div>
                        {teInfo.sangle !== '3' && teInfo.sangle !== '' &&
                            <label htmlFor='sangleNS'><h4>Nombre de sangles</h4>
                                <input type="number" name='sangleNS' id='sangle' onChange={handleInfoChange} />
                            </label>
                        }
                        <hr />
                        <h4>Nombre d'oeillets sur passage de barre?</h4>
                        <div className="slide-section">
                            <input type="radio" value='0' name="holeForBar" id="0" onChange={handleInfoChange} />
                            <label htmlFor='0'> Pas d'oeillet sur passage de barre</label>
                            <input type="radio" value='1' name="holeForBar" id="1" onChange={handleInfoChange} />
                            <label htmlFor='1'> 1 oeillets sur passage de barre</label>
                            <input type="radio" value='2' name="holeForBar" id="2" onChange={handleInfoChange} />
                            <label htmlFor='2'> 2 oeillets sur passage de barre</label>
                            <input type="radio" value='3' name="holeForBar" id="3" onChange={handleInfoChange} />
                            <label htmlFor='3'> 3 oeillets sur passage de barre</label>
                            <input type="radio" value='4' name="holeForBar" id="4" onChange={handleInfoChange} />
                            <label htmlFor='4'> 4 oeillets sur passage de barre</label>
                            <input type="radio" value='5' name="holeForBar" id="5" onChange={handleInfoChange} />
                            <label htmlFor='5'> 5 oeillets sur passage de barre</label>
                            <input type="radio" value='6' name="holeForBar" id="6" onChange={handleInfoChange} />
                            <label htmlFor='6'> 6 oeillets sur passage de barre</label>
                            <input type="radio" value='7' name="holeForBar" id="7" onChange={handleInfoChange} />
                            <label htmlFor='7'> 7 oeillets sur passage de barre</label>
                        </div>


                        {teInfo.holeForBar !== '' && Number(teInfo.holeForBar) > 1 &&
                            <label htmlFor='holeForBarEntraxe'>Entraxe oeillets sur passage de barre en mm
                                <input type='number' name='holeForBarEntraxe' placeholder={`ex: ${((teInfo.width - 40) / (teInfo.holeForBar - 1)).toFixed(0)}`} onChange={handleInfoChange} />
                            </label>
                        }
                    </div>
                }
                {
                    slide !== 'result' && slide !== 'proposeResult' && slide !== 'customResult' &&
                    <div className="btn-container">
                        <div className="swiper-button-next" onClick={handleValidateClick}>
                            Valider
                        </div>
                        <div className="swiper-button-prev" onClick={handleReturn}>
                            Retour
                        </div>

                    </div>
                }
            </div>

            {slide === 'result' &&
                <div className="result-container">
                    <h3>Résultat de votre recherche :</h3>
                    <div className="result-container-info">
                        <h5>La référence standard qui correspond à votre recherche est :</h5>
                        <p>Ref. ARTEM: {teListFiltered[0].reference}</p>
                        <p>largeur de la toile : {teListFiltered[0].width}</p>
                        <p>longueur de la toile : {teListFiltered[0].length}</p>
                        <p>{teListFiltered[0].designation}</p>
                        <Price price={teListFiltered[0].price} category='t3' />
                        <p>Délai : {teListFiltered[0].stock ? 'En stock' : '24/48h'}</p>
                    </div>
                </div>
            }

            {slide === 'proposeResult' &&
                <div className="result-container">
                    <h3>Résultat de votre recherche :</h3>
                    <div className="result-container-info">
                        <h5>Une référence pourrait correspondre à votre recherche. Veuillez tout de même vérifier que les caractéristiques correpondent</h5>
                        <p>Voici les données que vous avez indiquées :</p>
                        <p>Marque du four : {teInfo.brand}</p>
                        <p>Mode de fermeture : {teInfo.closing}</p>
                        <p>Largeur de la toile : {teInfo.width}</p>
                        <p>Longueur de la toile : {teInfo.length}</p>
                        <p>Et voici {teListFiltered.length > 1 ? 'les références' : 'la référence'} standard se rapprochant de votre recherche</p>
                        {teListFiltered.map((te) => {
                            return (
                                <div key={te.id} className='result-container-info'>
                                    <p>Ref. ARTEM: {te.reference}</p>
                                    <p>largeur de la toile : {te.width}</p>
                                    <p>longueur de la toile : {te.length}</p>
                                    <p>{te.designation}</p>
                                    <Price price={te.price} category='t3' />
                                    <p>Délai : {te.stock ? 'En stock' : '24/48h'}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }

            {
                slide === 'customResult' &&
                <div className="result-container">
                    <h3>Résultat de votre recherche :</h3>
                    <div className="result-container-info">
                        <h5>Voici les données que vous avez indiquées :</h5>
                        <p>Marque du four : {teInfo.brand.toUpperCase()}</p>
                        <p>Mode de fermeture : {teInfo.closing}</p>
                        <p>Largeur de la toile : {teInfo.width}</p>
                        <p>Longueur de la toile : {teInfo.length}</p>
                        {teInfo.closing === 'barre' &&
                            <>
                                <p>Nombre de rangées d'oeillets : {teInfo.row}</p>
                                <p>Nombre d'oeillets par rangée : {teInfo.hole}</p>
                                {teInfo.sameOrNot === 'same' &&
                                    <p>Entraxe oeillets : {teInfo.entraxe}</p>
                                }
                                {teInfo.sameOrNot === 'not' &&
                                    <>
                                        {teInfo.entraxeA !== '' && <p>Entraxe A : {teInfo.entraxeA}</p>}
                                        {teInfo.entraxeB !== '' && <p>Entraxe B : {teInfo.entraxeB}</p>}
                                        {teInfo.entraxeC !== '' && <p>Entraxe C : {teInfo.entraxeC}</p>}
                                        {teInfo.entraxeD !== '' && <p>Entraxe D : {teInfo.entraxeD}</p>}
                                        {teInfo.entraxeE !== '' && <p>Entraxe E : {teInfo.entraxeE}</p>}
                                        {teInfo.entraxeF !== '' && <p>Entraxe F : {teInfo.entraxeF}</p>}
                                        {teInfo.entraxeG !== '' && <p>Entraxe G : {teInfo.entraxeG}</p>}
                                        {teInfo.entraxeH !== '' && <p>Entraxe H : {teInfo.entraxeH}</p>}
                                    </>
                                }
                            </>
                        }
                        {teInfo.closing === 'cordon' &&
                            <>
                                <p>Nombre d'oeillets pour le cordon de chaque côté : {teInfo.holeForRope}</p>
                                <p>Nombre d'oeillets sur passage de barre : {teInfo.holeForBar}</p>
                                {teInfo.holeForBar > 1 && <p>Entraxe oeillets sur passage de barre : {teInfo.holeForBarEntraxe}</p>}
                            </>
                        }
                        {teInfo.closing === 'sangle' &&
                            <>
                                <p>Nombre de sangles : {teInfo.sangle}</p>
                                <p>Nombre d'oeillets sur passage de barre : {teInfo.holeForBar}</p>
                                {teInfo.holeForBar > 1 && <p>Entraxe oeillets sur passage de barre : {teInfo.holeForBarEntraxe}</p>}
                            </>
                        }
                        <h5>Et voici le prix de votre toile personnalisée:</h5>
                        <Price price={teInfo.t1} category='t1' />
                        <p>Délai : 24/48h</p>
                    </div>
                </div>
            }

        </main >
    );
}


