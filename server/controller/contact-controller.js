import Contact from "../models/Contact.js";

export const createContact= async(req,res)=>{


    try {
 const{firstName,lastName,email,phoneNumber,company,jobTitle}=req.body;
 if(!firstName|| !lastName || !email|| !phoneNumber || !company || !jobTitle ){
  return res.status(400).json({
    message:"Something is Missing",
    success:false
  })
 }

 const existContact=await Contact.findOne({email});

if(existContact){
    return res
    .status(400)
    .json({ message: "Email is already Used", success: false });
}
const phoneNumberexist=await Contact.findOne({phoneNumber});


if(phoneNumberexist){
    return res
    .status(400)
    .json({ message: "phone Number is already Used", success: false });
}

await Contact.create({
    firstName,lastName,phoneNumber,email,company,jobTitle
})


return res.status(200).json({
    message:"Contact Added Successfully",
    success:true
})




        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });    }

}

export const getAllContacts=async(req,res)=>{
    try {
        const  contacts=await Contact.find();
        return res.status(200).json({
            data:contacts,
            success:false

        })
        
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const deleteContact=async(req,res)=>{
    try {

        const contactId=req.params.id;
        const removeContact=await Contact.findByIdAndDelete(contactId);
        if(!removeContact){
            return res.status(400).json({
                message:"Contact not Found", success:false
            })
        }


        return res.status(200).json({
            message:"Contact Deleted Successfully",
            success:true

        })
        
    } catch (error) {
        console.error('Login error:', error);
    return res.status(500).json({ message: "Internal server error", success: false });
        
    }
}

export const updateContact = async (req, res) => {
    try {
      const updateData = req.body;
      const { id } = req.params;
  
      
      if (updateData.email) {
        const existingContact = await Contact.findOne({ email: updateData.email, _id: { $ne: id } });
  
        if (existingContact) {
          return res.status(400).json({
            success: false,
            message: "Email is already in use by another contact.",
          });
        }
      }
  
     
      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { ...updateData },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: updatedContact,
      });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ message: "Internal server error", success: false });
    }
  };
  

export const getContactById = async (req, res) => {
    try {
      const id = req.params.id;  
  
    
      const getContact = await Contact.findById(id);
  
      if (!getContact) {
        return res.status(404).json({
          message: "Contact not found",
          success: false
        });
      }
  
      return res.status(200).json({
        message: "Successfully retrieved data",
        getContact,
        success: true
      });
      
    } catch (error) {
      console.error('Error retrieving contact:', error);
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  };
  