import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const supplierSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contactPerson: { type: String, trim: true, default: "" },
    phone: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, default: "" },
    address: { type: String, trim: true, default: "" },
    city: { type: String, trim: true, default: "" },
    products: { type: String, trim: true, default: "" },
    notes: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

// Send "id" to the frontend instead of "_id"
supplierSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

const Supplier =
  mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

const pickFields = (body = {}) => ({
  name: body.name,
  contactPerson: body.contactPerson,
  phone: body.phone,
  email: body.email,
  address: body.address,
  city: body.city,
  products: body.products,
  notes: body.notes,
});

// Get all suppliers
router.get("/supplier", async (_req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to load suppliers." });
  }
});

// Add supplier
router.post("/supplier", async (req, res) => {
  try {
    const data = pickFields(req.body);

    if (!data.name || !String(data.name).trim()) {
      return res.status(400).json({ message: "Supplier name is required." });
    }

    const supplier = await Supplier.create(data);
    res.status(201).json({ message: "Supplier added.", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to add supplier." });
  }
});

// Update supplier
router.patch("/supplier/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid supplier id." });
    }

    const data = pickFields(req.body);

    // remove fields that were not sent
    Object.keys(data).forEach((key) => {
      if (data[key] === undefined) delete data[key];
    });

    if (data.name !== undefined && !String(data.name).trim()) {
      return res.status(400).json({ message: "Supplier name is required." });
    }

    const supplier = await Supplier.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    res.json({ message: "Supplier updated.", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update supplier." });
  }
});

// Delete supplier
router.delete("/supplier/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid supplier id." });
    }

    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    res.json({ message: "Supplier deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to delete supplier." });
  }
});

export default router;