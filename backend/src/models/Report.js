import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  complianceType: {
    type: String,
    required: true,
    enum: ['ISO', 'GDPR', 'SOC2', 'HIPAA', 'PCI-DSS', 'Other']
  },
  status: {
    type: String,
    required: true,
    enum: ['Compliant', 'Non-Compliant', 'In Progress', 'Under Review'],
    default: 'Under Review'
  },
  findings: {
    type: String,
    required: true
  },
  recommendations: {
    type: String
  },
  reportedBy: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  dueDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

reportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Report', reportSchema);