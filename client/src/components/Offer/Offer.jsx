import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../utils/api";

// ShadCN UI components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Offer({ propertyData }) {
  if (!propertyData) {
    return (
      <div className="min-h-screen bg-[#fdf8f2] text-[#050002] flex items-center justify-center">
        Error: Property data not found.
      </div>
    );
  }

  const navigate = useNavigate();
  const [offerPrice, setOfferPrice] = useState("");
  const [buyerType, setBuyerType] = useState("EndBuyer");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // State for the Dialog notification
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState("success"); // "success" or "warning"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!offerPrice || !email || !firstName || !lastName || !phone) {
      setDialogMessage("All fields are required.");
      setDialogType("warning");
      setDialogOpen(true);
      return;
    }

    const offerData = {
      email,
      phone,
      buyerType,
      propertyId: propertyData?.id,
      offeredPrice: parseFloat(offerPrice),
      firstName,
      lastName,
    };

    try {
      await api.post("/buyer/makeOffer", offerData);

      // If offer is below minPrice, show a warning and do not redirect
      if (parseFloat(offerPrice) < propertyData?.minPrice) {
        setDialogMessage(
        `At this time we cannot accept any offers below $${propertyData?.minPrice.toLocaleString()}. Consider offering a higher price.`
        );
        setDialogType("warning");
        setDialogOpen(true);
        return;
      }

      // If valid offer, show success and navigate back
      setDialogMessage("Offer submitted successfully!");
      setDialogType("success");
      setDialogOpen(true);
    } catch (error) {
      setDialogMessage("You've already offered this amount. Please adjust your offer to continue!");
      setDialogType("warning");
      setDialogOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf8f2] text-[#050002] flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-[#405025]/20 bg-[#fdf8f2] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#405025]">
            Make An Offer
          </CardTitle>
          <CardDescription className="text-[#324d49]">
            For {propertyData.streetAddress || "This Property"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName" className="text-sm text-[#050002]">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName" className="text-sm text-[#050002]">
                Last Name
              </Label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm text-[#050002]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <Label htmlFor="phone" className="text-sm text-[#050002]">
                Phone
              </Label>
              <Input
                id="phone"
                type="text"
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            {/* Buyer Type */}
            <div>
              <Label className="text-sm text-[#050002] mb-1 block">
                Buyer Type
              </Label>
              <Select
                value={buyerType}
                onValueChange={(val) => setBuyerType(val)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Buyer Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#fdf8f2] text-[#050002] border border-[#405025]/20">
                  <SelectItem value="CashBuyer">Cash Buyer</SelectItem>
                  <SelectItem value="Builder">Builder</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Realtor">Realtor</SelectItem>
                  <SelectItem value="Investor">Investor</SelectItem>
                  <SelectItem value="Wholesaler">Wholesaler</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Offer Price */}
            <div>
              <Label htmlFor="offerPrice" className="text-sm text-[#050002]">
                Offer Price ($)
              </Label>
              <Input
                id="offerPrice"
                type="number"
                placeholder="50000"
                min="1"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#324c48] text-[#fdf8f2] hover:bg-[#324c48]/90 font-semibold mt-4"
            >
              Submit Offer
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Dialog Notification */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[#fdf8f2] text-[#050002] border border-[#405025]/30 shadow-lg">
          <DialogHeader>
            <DialogTitle className={dialogType === "success" ? "text-green-600" : "text-red-600"}>
              {dialogType === "success" ? "Success" : "Warning"}
            </DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} className="bg-[#324c48] text-[#fdf8f2]">
              Okay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
