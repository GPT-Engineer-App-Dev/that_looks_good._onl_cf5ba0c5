import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, useToast, Heading, Radio, RadioGroup, Stack, Textarea } from "@chakra-ui/react";
import { FaPrint } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    sampleInfo: "",
  });
  const [uniqueNumber, setUniqueNumber] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const generateUniqueNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };

  const generateTrackingNumber = () => {
    return "CYK" + Date.now().toString().slice(-8);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueNum = generateUniqueNumber();
    const trackNum = generateTrackingNumber();
    setUniqueNumber(uniqueNum);
    setTrackingNumber(trackNum);

    // TODO: Email automation to send form data, unique number, and tracking number
    toast({
      title: "Form Submitted.",
      description: `Your unique number is ${uniqueNum} and your tracking number is ${trackNum}.`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const printLabel = () => {
    // TODO: Implement label printing functionality
    alert(`Print Shipping Label:\nCyklop CSC Att.: SampleLab M.Slot [${uniqueNumber}] Wilhelm Röntgenstraat 10, 8013NC, Zwolle, Nederland\nTracking Number: ${trackingNumber}`);
  };

  return (
    <Box bg="#002F5D" minH="100vh" py={10}>
      <Container maxW="container.md">
        <VStack spacing={5}>
          <Heading as="h1" size="xl" color="white">
            Shipment Tracking and Sample Request
          </Heading>
          <FormControl id="name" isRequired>
            <FormLabel color="white">Name</FormLabel>
            <Input name="name" type="text" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" color="white" />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel color="white">Email Address</FormLabel>
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" color="white" />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel color="white">Phone Number</FormLabel>
            <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" color="white" />
          </FormControl>
          <FormControl id="shippingAddress">
            <FormLabel color="white">Return Shipping Address</FormLabel>
            <Textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} placeholder="Enter the return shipping address" color="white" />
          </FormControl>
          <FormControl id="pictureOnly">
            <FormLabel color="white">Is a picture of the sample sufficient?</FormLabel>
            <RadioGroup name="pictureOnly" value={formData.pictureOnly} onChange={(value) => setFormData({ ...formData, pictureOnly: value })}>
              <Stack direction="row">
                <Radio value="yes" color="white">
                  Yes
                </Radio>
                <Radio value="no" color="white">
                  No
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl id="materialType" isRequired>
            <FormLabel color="white">Material Type</FormLabel>
            <Input name="materialType" value={formData.materialType} onChange={handleInputChange} placeholder="Enter the material type" color="white" />
          </FormControl>
          <FormControl id="materialSpecs" isRequired>
            <FormLabel color="white">Material Specifications</FormLabel>
            <Textarea name="materialSpecs" value={formData.materialSpecs} onChange={handleInputChange} placeholder="Enter the material specifications" color="white" />
          </FormControl>
          <FormControl id="sampleSize" isRequired>
            <FormLabel color="white">Desired Sample Size</FormLabel>
            <Input name="sampleSize" value={formData.sampleSize} onChange={handleInputChange} placeholder="Enter the desired sample size" color="white" />
          </FormControl>
          <FormControl id="sampleLocations">
            <FormLabel color="white">Possible Sample Locations</FormLabel>
            <Input name="sampleLocations" type="file" onChange={handleInputChange} color="white" />
          </FormControl>
          <FormControl id="logoUpload">
            <FormLabel color="white">Upload Logo or Design</FormLabel>
            <Input name="logoUpload" type="file" onChange={handleInputChange} color="white" accept=".pdf,.png,.jpg,.jpeg,.bmp,.ai,.plt,.svg" />
          </FormControl>
          <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={handleSubmit} isDisabled={trackingNumber != null}>
            Submit Request
          </Button>
          {trackingNumber && (
            <Button colorScheme="green" bg="#6CB42C" color="white" leftIcon={<FaPrint />} onClick={printLabel}>
              Print Shipping Label
            </Button>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;
