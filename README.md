# AI-Based Real-Time Transcription Tool for Video Conferencing  

## Overview  
This repository hosts the AI-based real-time transcription tool for video conferencing, developed as part of the Microsoft Hackathon 2025. The project addresses **Problem Statement No. MS-AI-14**, aiming to provide real-time multilingual transcription to eliminate language barriers in virtual communication.  

---

## Introduction  
Hello Everyone!  
I’m **Harshvardhan Singh**, and my teammates are **Yash Kamdar**, **Ammar Ahmad**, and **Anand Kumar**. Together, we developed this tool to ensure inclusivity and efficient communication during video conferencing.  

---

## Problem Statement  
In today's globalized world, video conferencing has become a staple for communication. However, language barriers and diverse accents often hinder seamless understanding.  
**Objective**: Provide **real-time multilingual transcription** during video conferencing to bridge language gaps and improve accessibility.  

---

## AI Solution  

Our solution integrates cutting-edge AI technologies for real-time transcription.  

### Frontend:  
- Built on **LiveKit**, an open-source platform for video conferencing.  
- **Technologies**:  
  - **TypeScript** and **Next.js** for customization of the interface and functionalities.  

### Transcription Backend:  
- **Azure Cognitive Services Speech SDK** for real-time transcription:  
  - Language recognition.  
  - Profanity filtering.  
  - Configurable silence handling.  
- **AI-Driven Transcription Agent**:  
  - Acts as a virtual participant in the video conference.  
  - Captures and processes live audio streams using the **LiveKit SDK**.  
  - Employs **four worker bots** to transcribe Hindi, English, Gujarati, and Punjabi.  
  - Ensures robust handling of diverse accents and speech patterns.  

---

## Demo  

**[Include Live Demo Details]**  
Showcase the multilingual capabilities and real-time accuracy of the transcription tool.  

---

## Impact  

Real-time multilingual transcription transforms video conferencing by:  
- **Breaking Language Barriers**: Enables seamless communication across diverse participants.  
- **Improving Collaboration**: Ideal for international teams and inclusive meetings.  
- **Enhancing Accessibility**: Critical for educational webinars and diverse communication needs.  

---

## Future Scope  

1. **Lag Reduction**: Minimize delay in generating real-time transcriptions.  
2. **Recording and Summarization**:  
   - Record entire conversations.  
   - Summarize discussions using advanced language models.  
3. **Multimodal Virtual Agent**:  
   - Introduce a virtual participant capable of:  
     - Answering questions or retrieving online information.  
     - Offering insights or solutions during meetings.  
     - Engaging in human-like interactions for an enhanced experience.  

---

## Tech Stack  

- **Frontend**:  
  - **LiveKit**  
  - **TypeScript**  
  - **Next.js**  
- **Backend**:  
  - **Azure Cognitive Services Speech SDK**  

---

## Installation  

To run this project locally, follow these steps:  
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/real-time-transcription.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Microsoft_Hackathon_2025-capstone-
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up Azure Cognitive Services:
   - Obtain the API key and endpoint from the Azure portal.
   - Add the key and endpoint to the `.env` file:
     ```env
     AZURE_SPEECH_KEY=your-key
     AZURE_SPEECH_ENDPOINT=your-endpoint
     ```
5. Start the development server:
   ```bash
   npm start
   ```

## Contributors
- **Harshvardhan Singh - 2201CS92**
- **Yash Kamdar - 2201AI45**
- **Ammar Ahmad - 2201AI04**
- **Anand Kumar - 2201AI05**

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Microsoft Azure Cognitive Services
- LiveKit Open Source Community

## Contact
For any queries or contributions, please contact us at:
- [harshchauhan97194@gmail.com]
- [[Project Repository Link](https://github.com/DEDSWIN/Microsoft_Hackathon_2025-capstone-)]
