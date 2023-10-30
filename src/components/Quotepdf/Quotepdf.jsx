import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import artemData from '../../../data/artem-data';
import goodPrice from '../../utils/goodPrice';

export default function Quotepdf({ quote, user, totalWeight, totalPrice }) {


    const transportCost = quote.transport && typeof quote.transport === 'number' ? quote.transport : 0;
    const tvaCoeff = quote.country?.toLowerCase() !== "france" || quote.zip_code.startsWith("97") ? 0 : 0.2;
    const ttcCoeff = quote.country?.toLowerCase() !== "france" || quote.zip_code.startsWith("97") ? 1 : 1.2;
    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            padding: '1cm',
            border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            size: 'A4',
            fontSize: 10,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left',
            borderBottom: '1px double black',
            width: '100%',
            fontSize: 10,
            padding: '5px',
            title: {
                fontSize: 13,
                fontWeight: 'bold',
                paddingBottom: '2px',
            },
            section1: {
                width: '30%',

            },
            section2: {
                width: '25%',

            },
        },
        subtitle: {
            fontSize: 12,
            fontWeight: '700',
            paddingBottom: '5px',
        },

        addressSection: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            fontSize: 12,
            padding: '5px',
            margin: '15px 0',
            address: {
                width: '30%',
                border: '1px solid black',
            }
        },
        quotation: {
            textAlign: 'center',
            borderTop: '2px solid black',
            borderBottom: '2px solid black',
            width: '100%',
            fontSize: 15,
            fontWeight: 'bold',
            padding: '5px',
            margin: '5px 0',
        },
        // Ajoutez d'autres styles selon vos besoins
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            borderRightWidth: 0,
            borderBottomWidth: 1,
        },
        tableRow: {
            // margin: 'auto',
            flexDirection: 'row',
        },
        tableHeaderCell: {
            fontSize: 11,
            width: '8%',
            fontWeight: 'bold',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            paddingHorizontal: 8,
            paddingVertical: 4,
            height: '30px',
            quantite: {
                fontSize: 11,
                width: '7%',
                fontWeight: 'bold',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                paddingHorizontal: 8,
                paddingVertical: 4,
                height: '30px',
            },
            price: {
                fontSize: 11,
                width: '12%',
                fontWeight: 'bold',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                paddingHorizontal: 8,
                paddingVertical: 4,
                height: '30px',
            },
            reference: {
                height: '30px',
                fontSize: 11,
                width: '20%',
                fontWeight: 'bold',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },
            designation: {
                paddingHorizontal: 8,
                paddingVertical: 4,
                height: '30px',
                width: '30%',
                fontSize: 11,
                fontWeight: 'bold',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },
            totalPrice: {
                display: 'table-cell',
                fontSize: 11,
                width: '16%',
                fontWeight: 'bold',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                paddingHorizontal: 8,
                paddingVertical: 4,
                height: '30px',
            },

        },
        tableCell: {
            position: 'relative',
            fontSize: 9,
            width: '8%',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            borderRightWidth: 1,
            padding: '5px',
            height: '30px',
            reference: {
                fontSize: 9,
                width: '20%',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                padding: '5px',
                height: '30px',
            },
            price: {
                fontSize: 9,
                width: '12%',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                padding: '5px',
                height: '30px',
            },
            quantite: {
                fontSize: 9,
                width: '7%',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
                padding: '5px',
                height: '30px',
            },
            designation: {
                height: '30px',
                width: '30%',
                padding: '5px',
                fontSize: 9,
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },
            port: {
                height: '30px',
                width: '50%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },
            portTitle: {
                height: '30px',
                width: '35%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },


            total: {
                height: '30px',
                width: '85%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderRightWidth: 1,
            },

            totalPrice: {
                height: '30px',
                width: '16%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },
            clicli: {
                height: '30px',
                width: '85%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderRightWidth: 1,
            },

            clicliPrice: {
                height: '30px',
                width: '16%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderBottomWidth: 1,
                borderRightWidth: 1,
            },
            lastTotalPrice: {
                height: '30px',
                width: '16%',
                padding: '5px',
                fontSize: 9,
                textAlign: 'right',
                borderBottomColor: '#000',
                borderBottomWidth: 0,
                borderRightWidth: 1,
            },
            redFlagPort: {
                position: 'absolute',
                top: '30px',
                left: '70px',
                width: '70%',
                color: 'red',
                fontSize: 15,

            }
        },
        presentation: {
            fontSize: 10,
            width: '100%',
            textAlign: 'left',
            padding: '5px',
            margin: '15px 0',

        },
        text: {
            fontSize: 9,
            width: '100%',
            textAlign: 'left',
            paddingLeft: '5px',
            margin: '15px 0',
        },
        signature: {
            flexGrow: 1,
            fontSize: 10,
            width: '100%',
            textAlign: 'right',
            marginTop: '20px',
            paddingRight: '70px',
        },
        footer: {

            fontSize: 9,
            width: '100%',
            textAlign: 'center',
            paddingTop: '10px',
            borderTop: '2px double black',
        }
    });
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View style={styles.header.section1}>
                        <Text style={styles.header.title}>{artemData.name}</Text>
                        <Text>{artemData.slogan}</Text>
                        <Text>{artemData.adress}</Text>
                        <Text>{artemData.address2}</Text>
                        <Text>{artemData.postalCode} {artemData.city}</Text>
                        <Text>Email : {artemData.email}</Text>
                    </View>
                    <View style={styles.header.section2}>
                        <Text>Téléphone : {artemData.tel}</Text>
                        <Text>Télécopie : {artemData.fax}</Text>
                        <Text>Siret : {artemData.siret}</Text>
                        <Text>Intracom : {artemData.intracom}</Text>
                        <Text>N.A.F. : {artemData.NAF}</Text>

                    </View>
                </View>
                <View style={styles.addressSection}>
                    <View>
                        <Text>Devis n° {quote.quotation_id}</Text>
                        <Text>Date : {quote.creation_date}</Text>
                        <Text>Validité : {quote.expiration_date}</Text>
                        <Text>Référence : {quote.reference}</Text>
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.subtitle}>Adresse de Facturation</Text>
                        <Text>{user.billing_address.name_address}</Text>
                        <Text>{user.billing_address.street_address}</Text>
                        <Text>{user.billing_address.zip_code} {user.billing_address.city}</Text>
                        <Text>{user.billing_address.country}</Text>
                    </View>
                    <View style={styles.address}>
                        <Text style={styles.subtitle}>Adresse de Livraison</Text>
                        <Text>{quote.name_address}</Text>
                        <Text>{quote.street_address}</Text>
                        <Text>{quote.zip_code} {quote.city}</Text>
                        <Text>{quote.country}</Text>
                    </View>

                </View>

                <View style={styles.quotation}>
                    <Text>Devis</Text>
                </View>
                <View style={styles.presentation}>
                    <Text>Cher client,</Text>
                    <Text>Nous vous prions de trouver ci-dessous nos conditions les meilleures :</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeaderCell.reference}>Référence</Text>
                        <Text style={styles.tableHeaderCell.designation}>Produit</Text>
                        <Text style={styles.tableHeaderCell.price}>PUHT</Text>
                        <Text style={styles.tableHeaderCell.quantite}>Qté</Text>
                        <Text style={styles.tableHeaderCell}>Poids</Text>
                        <Text style={styles.tableHeaderCell}>Délai</Text>
                        <Text style={styles.tableHeaderCell.totalPrice}>Total</Text>
                    </View>

                    {quote.products && Array.isArray(quote.products) && quote.products.map(product => {
                        const price = goodPrice(user.profile_id, product);
                        product.priceWithCoeff = product.price;
                        if (product.reference.startsWith('TB') && product.quantity < 20) {
                            product.priceWithCoeff = product.price * 1.1;
                        }
                        return (
                            <View style={styles.tableRow} key={product.id}>
                                <Text style={styles.tableCell.reference}>{product.reference}</Text>
                                <Text style={styles.tableCell.designation}>{product.designation}</Text>
                                <Text style={styles.tableCell.price}>{goodPrice(user.profile_id, product, product.quantity)} €</Text>
                                <Text style={styles.tableCell.quantite}>{product.quantity}</Text>
                                <Text style={styles.tableCell}>{product.weight} kg</Text>
                                <Text style={styles.tableCell}>{product.delivery_time.startsWith("0") ? "stock" : product.delivery_time}</Text>
                                <Text style={styles.tableCell.totalPrice}>{(goodPrice(user.profile_id, product, product.quantity) * product.quantity).toFixed(2)} € HT</Text>

                            </View>
                        )
                    })}
                    {quote.transport &&
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell.port}>Poids net total : {totalWeight.toFixed(2)} kg</Text>
                            <Text style={styles.tableCell.portTitle}>Port et emballage :</Text>
                            {quote.delivery_id === 1 &&
                                <Text style={styles.tableCell.port}>Enlèvement à Montévrain</Text>
                            }
                            {quote.delivery_id !== 1 &&
                                <Text style={styles.tableCell.totalPrice}>{typeof quote.transport === "string" ? "Nous consulter" : `${quote.transport.toFixed(2)} € HT`}</Text>
                            }
                        </View>
                    }

                    {quote.clicli === 6 &&
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell.clicli}>Supplément livraison en dépôt ou chez votre client</Text>
                            <Text style={styles.tableCell.clicliPrice}>{quote.clicli.toFixed(2)} € HT</Text>
                        </View>
                    }
                    {
                        quote.zip_code.startsWith("20") || quote.zip_code.startsWith("2A") || quote.zip_code.startsWith("2B") &&
                        <View style={styles.tableRow}>
                            <Text style={styles.tableCell.clicli}>Supplément livraison en Corse</Text>
                            <Text style={styles.tableCell.clicliPrice}>{artemData.corse.toFixed(2)} € HT</Text>
                        </View>
                    }

                    <View style={styles.tableRow}>
                        {typeof quote.transport === "string" && quote.delivery_id !== 1 &&
                            <View style={styles.tableCell.redFlagPort}>
                                <Text>Attention port à ajouter : nous consulter</Text>
                            </View>
                        }
                        <Text style={styles.tableCell.total}>
                            Total HT :</Text>
                        <Text style={styles.tableCell.totalPrice}>{(totalPrice + transportCost + quote.clicli).toFixed(2)} € HT</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell.total}>TVA :</Text>
                        <Text style={styles.tableCell.totalPrice}>{((totalPrice + transportCost + quote.clicli) * tvaCoeff).toFixed(2)} €</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell.total}>Total TTC</Text>
                        <Text style={styles.tableCell.lastTotalPrice}>{((totalPrice + transportCost + quote.clicli) * ttcCoeff).toFixed(2)} € TTC</Text>
                    </View>
                </View>

                <View style={styles.text}>
                    <Text>Conditions de paiement : Conditions habituelles </Text>
                </View>
                <View style={styles.text}>
                    <Text>Les livraisons sont effectuées par</Text>
                    <Text>CHRONOPOST ou TNT pour les colis de moins de 50kg - livraison sous 24 heures (non garantie)</Text>
                    <Text>SCHENKER pour les autres - livraison sous 24/72 heures (non garantie)</Text>
                    <Text>Supplément : </Text>
                    <Text>livraison en dépôt : 6 € HT</Text>
                    <Text>livraison chez votre client : 6 € HT</Text>
                    <Text>livraison en Corse : 26 € HT</Text>
                    <Text>Export : nous consulter</Text>
                </View>

                <View style={styles.text}>
                    <Text>Nous sommes à votre disposition pour tout complément d'informations.</Text>
                    <Text>Nous vous prions d'agréer, cher client, nos sincères salutations</Text>
                </View>
                <View style={styles.signature}>
                    <Text>Le service commercial {artemData.name}</Text>
                </View>
                <View style={styles.footer}>
                    <Text>La marchandise reste la propriété d'Artem jusqu'à son réglement complet.</Text>
                    <Text>Cette offre est soumise au retour des documents d'ouverture de compte.</Text>
                </View>
            </Page>
        </Document >
    );
}


