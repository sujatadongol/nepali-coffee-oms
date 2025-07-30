import React, { useState, useEffect } from 'react';
import {
  Plus, Coffee, Snowflake, Milk, Circle, Croissant, Edit2, Trash2
} from 'lucide-react';
import ExcelUploader from './ExcelUploader';

const MenuManager = () => {
  const staticMenuData = [/* Your static data here */];

  const getCategoryKey = (categoryName) => {
    const mapping = {
      'Black Coffee': 'black-coffee',
      'Milk Coffee': 'milk-coffee',
      'Cold Coffee': 'cold-coffee',
      'Coffee Alternatives': 'coffee-alternatives',
      'Bakery': 'bakery'
    };
    return mapping[categoryName] || 'black-coffee';
  };

  const convertStaticData = () => {
    const converted = [];
    staticMenuData.forEach(category => {
      category.items.forEach(item => {
        converted.push({
          id: item.id,
          name: item.name,
          price: item.price,
          imgSrc: item.imgSrc || '',
          description: '',
          category: getCategoryKey(category.key),
          isStatic: true
        });
      });
    });
    return converted;
  };

  const [menuItems, setMenuItems] = useState(() => {
    const existingData = localStorage.getItem('menuItems');
    return existingData ? JSON.parse(existingData) : convertStaticData();
  });

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'cold-coffee',
    imgSrc: ''
  });

  useEffect(() => {
    const existingData = localStorage.getItem('menuItems');
    if (!existingData) {
      const converted = convertStaticData();
      localStorage.setItem('menuItems', JSON.stringify(converted));
      setMenuItems(converted);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imgSrc: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = {
    'cold-coffee': {
      name: 'Cold Coffee',
      icon: Snowflake,
      color: 'text-primary bg-primary bg-opacity-10 border-primary'
    },
    'coffee-alternatives': {
      name: 'Coffee Alternatives',
      icon: Coffee,
      color: 'text-success bg-success bg-opacity-10 border-success'
    },
    'milk-coffee': {
      name: 'Milk Coffee',
      icon: Milk,
      color: 'text-warning bg-warning bg-opacity-10 border-warning'
    },
    'black-coffee': {
      name: 'Black Coffee',
      icon: Circle,
      color: 'text-dark bg-light border-secondary'
    },
    'bakery': {
      name: 'Bakery',
      icon: Croissant,
      color: 'text-danger bg-danger bg-opacity-10 border-danger'
    }
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.price) return;

    let updatedItems;
    if (editingItem) {
      updatedItems = menuItems.map(item =>
        item.id === editingItem.id
          ? { ...editingItem, ...formData, price: parseFloat(formData.price) }
          : item
      );
      setEditingItem(null);
    } else {
      const newItem = {
        ...formData,
        id: `custom-${Date.now()}`,
        price: parseFloat(formData.price),
        isStatic: false
      };
      updatedItems = [...menuItems, newItem];
    }

    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    setFormData({ name: '', description: '', price: '', category: 'cold-coffee', imgSrc: '' });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      imgSrc: item.imgSrc || ''
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const updated = menuItems.filter(item => item.id !== id);
    setMenuItems(updated);
    localStorage.setItem('menuItems', JSON.stringify(updated));
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '', price: '', category: 'cold-coffee', imgSrc: '' });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleBack = () => {
    window.history.back();
  };

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="container">
        <div className="card shadow-lg border-0">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="h2 mb-0 text-dark fw-bold">Menu Management</h1>
              <div className="d-flex gap-2">
                <button onClick={() => setShowForm(true)} className="btn btn-primary d-flex align-items-center gap-2">
                  <Plus size={20} />
                  Add Menu Item
                </button>
                <button onClick={handleBack} className="btn btn-outline-dark">
                  Back to Table
                </button>
              </div>
            </div>

            <ExcelUploader onUploadComplete={() => window.location.reload()} />

            {showForm && (
              <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                onClick={(e) => e.target === e.currentTarget && handleCancel()}>
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</h5>
                      <button type="button" className="btn-close" onClick={handleCancel}></button>
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Item Name</label>
                        <input type="text" className="form-control" placeholder="Enter item name" required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Category</label>
                        <select className="form-select"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}>
                          {Object.entries(categories).map(([key, val]) => (
                            <option key={key} value={key}>{val.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Description</label>
                        <textarea className="form-control" rows="3" placeholder="Brief description"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Price ($)</label>
                        <input type="number" step="0.01" className="form-control" placeholder="0.00" required
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control"
                          id="image"
                          onChange={handleImageUpload}
                        />
                      </div>
                      {formData.imgSrc && (
                        <div className="mb-3">
                          <label className="form-label fw-semibold">Preview</label>
                          <img src={formData.imgSrc} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'contain' }} />
                        </div>
                      )}
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                      <button className="btn btn-primary" onClick={handleSubmit}>
                        {editingItem ? 'Update Item' : 'Add Item'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="row g-4">
              {Object.entries(categories).map(([categoryKey, categoryInfo]) => {
                const items = groupedItems[categoryKey] || [];
                const IconComponent = categoryInfo.icon;

                return (
                  <div key={categoryKey} className="col-12">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <div className="d-flex align-items-center gap-3 mb-4">
                          <div className={`p-3 rounded border-2 ${categoryInfo.color}`}>
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <h3 className="h5 mb-1 fw-bold">{categoryInfo.name}</h3>
                            <p className="text-muted mb-0">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                          </div>
                        </div>

                        {items.length === 0 ? (
                          <div className="text-center py-5">
                            <IconComponent size={48} className="text-muted opacity-50 mb-3" />
                            <p className="text-muted">No items in this category yet</p>
                          </div>
                        ) : (
                          <div className="table-responsive">
                            <table className="table table-bordered align-middle table-hover">
                              <thead className="table-light">
                                <tr>
                                  <th>#</th>
                                  <th>Item Name</th>
                                  <th>Description</th>
                                  <th>Image</th>
                                  <th className="text-end">Price ($)</th>
                                  <th className="text-center">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {items.map((item, idx) => (
                                  <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td className="fw-semibold">{item.name}</td>
                                    <td>{item.description || '-'}</td>
                                    <td>
                                      {item.imgSrc ? (
                                        <img src={item.imgSrc} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
                                      ) : (
                                        <span className="text-muted">No Image</span>
                                      )}
                                    </td>
                                    <td className="text-end text-success fw-bold">${item.price.toFixed(2)}</td>
                                    <td className="text-center">
                                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(item)}>
                                        <Edit2 size={14} />
                                      </button>
                                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                                        <Trash2 size={14} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {menuItems.length === 0 && (
              <div className="text-center py-5">
                <Coffee size={64} className="text-muted opacity-25 mb-4" />
                <h3 className="h4 mb-2">No menu items yet</h3>
                <p className="text-muted mb-4">Start building your menu by adding your first item</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn btn-primary d-inline-flex align-items-center gap-2"
                >
                  <Plus size={20} />
                  Add Your First Item
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
