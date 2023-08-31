import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import artemData from '../../../data/artem-data';

export default function Quotepdf({ quote, user, totalWeight, totalPrice }) {

    console.log(quote);
    console.log(user);
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
        },
        header: {
            fontSize: 18,
            marginBottom: 10,
        },
        // Ajoutez d'autres styles selon vos besoins
    });

    const productsArray = JSON.parse(quote.products);



    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>{artemData.name}</Text>
                    <Text>{artemData.slogan}</Text>
                    <Text>{artemData.adress}</Text>
                    <Text>{artemData.address2}</Text>
                    <Text>{artemData.postalCode} {artemData.city}</Text>
                </View>

                <View>
                    <Text>N° Devis : {quote.quotation_id}</Text>
                    <Text>Date : {quote.creation_date}</Text>
                    <Text>Validité : {quote.expiration_date}</Text>
                    <Text>Référence : {quote.reference}</Text>
                </View>
                <View>
                    <Text>Adresse de Facturation</Text>
                    <Text>{user.billing_address.name_address}</Text>
                    <Text>{user.billing_address.street_address}</Text>
                    <Text>{user.billing_address.zip_code} {user.billing_address.city}</Text>
                </View>
                <View>
                    <Text>Adresse de Livraison</Text>
                    <Text>{quote.name_address}</Text>
                    <Text>{quote.street_address}</Text>
                    <Text>{quote.zip_code} {quote.city}</Text>
                </View>

                <View>
                    <Text>Devis</Text>
                    <Text>Cher client,</Text>
                    <Text>Nous vous prions de trouver ci-dessous nos conditions les meilleures :</Text>
                </View>

                <View>
                    <Text>Adresse de livraison : </Text>
                    <Text>{quote.name_address}</Text>
                    <Text>{quote.street_address}</Text>
                    <Text>{quote.zip_code} {quote.city}</Text>
                </View>

                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableHeaderCell}>Référence</Text>
                        <Text style={styles.tableHeaderCell}>Produit</Text>
                        <Text style={styles.tableHeaderCell}>Prix HT</Text>
                        <Text style={styles.tableHeaderCell}>Quantité</Text>
                        <Text style={styles.tableHeaderCell}>Poids</Text>
                        <Text style={styles.tableHeaderCell}>Délai</Text>
                        <Text style={styles.tableHeaderCell}>total HT</Text>
                        {/* Ajoutez plus d'en-têtes de colonnes si nécessaire */}
                    </View>

                    {quote.products && productsArray.map(product => (
                        <View style={styles.tableRow} key={product.id}>
                            <Text style={styles.tableCell}>{product.reference}</Text>
                            <Text style={styles.tableCell}>{product.designation}</Text>
                            <Text style={styles.tableCell}>{product.price} €</Text>
                            <Text style={styles.tableCell}>{product.quantity}</Text>
                            <Text style={styles.tableCell}>{product.weight} kg</Text>
                            <Text style={styles.tableCell}>{product.delivery_time.startsWith("0") ? "stock" : product.delivery_time}</Text>
                            <Text style={styles.tableCell}>{(product.price * product.quantity).toFixed(2)} €</Text>
                            {/* Ajoutez plus de cellules si nécessaire */}
                        </View>
                    ))}

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Poids net total : {totalWeight}</Text>
                        <Text style={styles.tableCell}>Total HT : {totalPrice} €</Text>
                    </View>
                </View>
            </Page>
        </Document >
    );
}


