import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import { formatPrice, getStatusColor } from '../utils/helpers';

const OrderDetailScreen = ({ route }) => {
  const { order } = route.params;

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getImageSource = (imageName) => {
    const imageMap = {
      'apple 11': require('../assets/images/apple 11.jpg'),
      'apple X': require('../assets/images/apple X.jpg'),
      'techrader': require('../assets/images/techrader.jpg'),
      'grocery': require('../assets/images/grocery.jpg'),
      'lotion': require('../assets/images/lotion.jpg'),
      'lotion supplies': require('../assets/images/lotion supplies.jpg'),
      'hardware apliances': require('../assets/images/hardware apliances.jpg'),
      'suppliers': require('../assets/images/suppliers.jpg'),
      'cell smart': require('../assets/images/cell smart.jpg'),
      'flipmini mobile': require('../assets/images/flipmini mobile.jpg'),
      'foldable mobile': require('../assets/images/foldable mobile.jpg'),
      'google pixel': require('../assets/images/google pixel.jpg'),
      'nokia': require('../assets/images/nokia.jpg'),
      'pc batter': require('../assets/images/pc batter.jpg'),
      'phone batter': require('../assets/images/phone batter.jpg'),
      'motherboard': require('../assets/images/motherboard.jpg'),
      'ram': require('../assets/images/ram.jpg'),
      'rom': require('../assets/images/rom.jpg'),
      'com components': require('../assets/images/com components.jpg'),
      'computerparts': require('../assets/images/computerparts.jpg'),
      'banaan': require('../assets/images/banaan.jpg'),
      'eggs': require('../assets/images/eggs.jpg'),
      'eeggs': require('../assets/images/eeggs.jpg'),
      'fruits': require('../assets/images/fruits.jpg'),
      'veges': require('../assets/images/veges.jpg'),
      'spices': require('../assets/images/spices.jpg'),
      'morebean': require('../assets/images/morebean.jpg'),
      'peanut better': require('../assets/images/peanut better.jpg'),
      'mayonaise': require('../assets/images/mayonaise.jpg'),
      'mozoe juice': require('../assets/images/mozoe juice.jpg'),
      'tides': require('../assets/images/tides.jpg'),
      'ragaram': require('../assets/images/ragaram.jpg'),
      'wholesale grocery': require('../assets/images/wholesale grocery.jpg'),
      'Sl perfume': require('../assets/images/Sl perfume.jpg'),
      'babylotion': require('../assets/images/babylotion.jpg'),
      'charm perfum': require('../assets/images/charm perfum.jpg'),
      'nashwa perfume': require('../assets/images/nashwa perfume.jpg'),
      'ninea lotion': require('../assets/images/ninea lotion.jpg'),
      'odole perfume': require('../assets/images/odole perfume.jpg'),
      'ppink perfume': require('../assets/images/ppink perfume.jpg'),
      'sovazze perfume': require('../assets/images/sovazze perfume.jpg'),
      'uvage perfume': require('../assets/images/uvage perfume.jpg'),
      'vaseline': require('../assets/images/vaseline.jpg'),
      'aveena': require('../assets/images/aveena.jpg'),
      'bolts and nuts': require('../assets/images/bolts and nuts.jpg'),
      'cable tiles': require('../assets/images/cable tiles.avif'),
      'glue': require('../assets/images/glue.jpg'),
      'pipeco': require('../assets/images/pipeco.avif'),
      'pipeconnector': require('../assets/images/pipeconnector.jpg'),
      'pipes': require('../assets/images/pipes.jpg'),
      'stove parts': require('../assets/images/stove parts.jpg'),
      'wirecuttuter': require('../assets/images/wirecuttuter.jpg'),
      'HH drive': require('../assets/images/HH drive.jpg'),
      'RRam': require('../assets/images/RRam.jpg'),
      'trolley': require('../assets/images/trolley.jpg'),
      'economy wholesale': require('../assets/images/economy wholesale.jpg'),
      'icon': require('../assets/images/icon.png'),
    };
    return imageMap[imageName] || require('../assets/images/icon.png');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
            <Text style={styles.statusText}>{getStatusLabel(order.status)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Date</Text>
          <Text style={styles.sectionContent}>
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Status Timeline</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, order.status !== 'cancelled' && styles.timelineDotActive]} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Order Placed</Text>
                <Text style={styles.timelineDate}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
            {(order.status === 'shipped' || order.status === 'delivered') && (
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Order Shipped</Text>
                  <Text style={styles.timelineDate}>In transit</Text>
                </View>
              </View>
            )}
            {order.status === 'delivered' && (
              <View style={styles.timelineItem}>
                <View style={[styles.timelineDot, styles.timelineDotActive]} />
                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>Delivered</Text>
                  <Text style={styles.timelineDate}>Order completed</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items?.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Image
                source={getImageSource(item.product?.image)}
                style={styles.itemImage}
                resizeMode="cover"
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.product?.name || 'Product'}
                </Text>
                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                <Text style={styles.itemPrice}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(order.total)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(order.total)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
  },
  timeline: {
    marginLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    marginTop: 4,
    marginRight: 12,
  },
  timelineDotActive: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timelineDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  itemQuantity: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default OrderDetailScreen;
