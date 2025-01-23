This was made as a hackathon project for [Frost Hacks 2024]([https://devfolio.co/projects/yaash-yet-another-ai-shell-192b](https://devpost.com/software/snippetsafe?ref_content=my-projects-tab&ref_feature=my_projects)) by [Vee](https://github.com/veesesh), [Ashish Malla](https://github.com/im45145v), [Siddarth](https://github.com/siddarth2810) and [Sushant](https://github.com/Sushants-Git)

--

# SnippetSafe

Never loose your code snippits again.

![image](https://github.com/user-attachments/assets/417fcc09-a61e-45f4-88f3-9c8d8e7ce907)

## Problem
While searching for an old code snippet during a project, we wasted significant time trying to recall and locate it. This experience inspired us to create a tool that efficiently stores and organizes code snippets, allowing users to easily retrieve them using some AI wizardery, even with vague descriptions, making the process seamless and time-saving.

## What it does
You can easily store code snippets by copying them and adding a brief description along with some tags for better organization. The tool uses cosine similarity to match descriptions, allowing you to find snippets even with vague queries. This means you can type in a general idea of what you're looking for, and the tool will help you locate the relevant snippets. It makes managing your code snippets more efficient and helps you access what you need quickly. Plus, it runs locally in your browser, so you don’t have to worry about any costs.

![image](https://github.com/user-attachments/assets/2c7c7250-1f64-4c54-b39a-01f444196c8d)

![image](https://github.com/user-attachments/assets/d2d8085c-e8ff-470f-bec7-8e9aa5ca288d)

## How We Built It

- Developed the front-end using React.js for seamless browser interaction.
- Employed JavaScript for various project aspects.
- Utilized MongoDB for user-specific snippet storage, ensuring accessibility from any device.
- Integrated a pretrained model from Hugging Face for sentence similarity.
- Added a touch of frosty snow to enhance the experience.

