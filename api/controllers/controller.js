const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');

const readJSON = (filename) => {
  const data = fs.readFileSync(path.join(dataDir, filename), 'utf8');
  return JSON.parse(data);
};

const writeJSON = (filename, data) => {
  fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(data, null, 2));
};

const storesController = {
  getAll: (req, res) => {
    try {
      const stores = readJSON('stores.json');
      res.json(stores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: (req, res) => {
    try {
      const stores = readJSON('stores.json');
      const store = stores.find(s => s.id === req.params.id);
      if (!store) {
        return res.status(404).json({ error: 'Store not found' });
      }
      res.json(store);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const productsController = {
  getAll: (req, res) => {
    try {
      let products = readJSON('products.json');
      const { storeId, search } = req.query;
      
      if (storeId) {
        products = products.filter(p => p.storeId === storeId);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
        );
      }
      
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: (req, res) => {
    try {
      const products = readJSON('products.json');
      const product = products.find(p => p.id === req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: (req, res) => {
    try {
      const products = readJSON('products.json');
      const newProduct = {
        id: 'prod' + Date.now(),
        ...req.body
      };
      products.push(newProduct);
      writeJSON('products.json', products);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: (req, res) => {
    try {
      const products = readJSON('products.json');
      const index = products.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      products[index] = { ...products[index], ...req.body };
      writeJSON('products.json', products);
      res.json(products[index]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: (req, res) => {
    try {
      let products = readJSON('products.json');
      const index = products.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Product not found' });
      }
      products = products.filter(p => p.id !== req.params.id);
      writeJSON('products.json', products);
      res.json({ message: 'Product deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const ordersController = {
  getAll: (req, res) => {
    try {
      let orders = readJSON('orders.json');
      const { userId, storeId, status } = req.query;
      
      if (userId) {
        orders = orders.filter(o => o.userId === userId);
      }
      
      if (storeId) {
        orders = orders.filter(o => o.storeId === storeId);
      }
      
      if (status) {
        orders = orders.filter(o => o.status === status);
      }
      
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: (req, res) => {
    try {
      const orders = readJSON('orders.json');
      const order = orders.find(o => o.id === req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: (req, res) => {
    try {
      const orders = readJSON('orders.json');
      const newOrder = {
        id: 'order' + Date.now(),
        ...req.body,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      orders.push(newOrder);
      writeJSON('orders.json', orders);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: (req, res) => {
    try {
      const orders = readJSON('orders.json');
      const index = orders.findIndex(o => o.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: 'Order not found' });
      }
      orders[index] = { ...orders[index], ...req.body };
      writeJSON('orders.json', orders);
      res.json(orders[index]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

const authController = {
  login: (req, res) => {
    try {
      const { email, password } = req.body;
      const users = readJSON('users.json');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = {
  storesController,
  productsController,
  ordersController,
  authController
};
