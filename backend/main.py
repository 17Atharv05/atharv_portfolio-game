import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://atharv-portfolio-game.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


PORTFOLIO_INFO = """
ABOUT ME
Common keywords: about, about Atharv, who is Atharv, background, introduction

- Name: Atharv Farjand
- Birthday: 17 February 2005
- BCA graduate from Acharya Bangalore B-School.
- Background in software development and computer applications.
- Atharv is a fresher / entry-level candidate.


EDUCATION
Common keywords: education, degree, qualification, college, BCA, graduation, graduated

- Bachelor of Computer Applications (BCA)
- Acharya Bangalore B-School
- Atharv has completed his BCA and is a graduate.


PROFESSIONAL STATUS
Common keywords: fresher, experienced, experience, job experience, career status, work experience

- Atharv is a fresher / entry-level candidate.
- He is currently looking for opportunities.
- His career focus includes Python development, AI/ML, web development and full-stack development.
- Do not claim that Atharv has professional work experience unless it is explicitly provided in this information.


SKILLS
Common keywords: skills, technical skills, technologies, tech stack, programming, what does he know

- Python
- JavaScript
- React
- HTML
- CSS
- SQL
- FastAPI
- Three.js
- React Three Fiber
- Drei
- Git
- GitHub


PROJECTS
Common keywords: projects, work, portfolio projects, what has he built

Interactive 3D Portfolio Website:
- Built using React, Three.js, React Three Fiber and Drei.
- Designed as an interactive 3D island-based portfolio.
- Includes About Me, Projects & Skills, Experience & Journey,
  Resume and Contact sections.


INTERESTS
Common keywords: interests, areas of interest, what is he interested in, technical interests

- Artificial Intelligence
- Machine Learning
- Generative AI
- Python development
- Web development
- Full-stack development
- 3D web development
- AI-powered applications


CAREER GOALS
Common keywords: career, career goals, job, looking for, career interests, what role does he want

- Python development
- AI/ML
- Web development
- Full-stack development


HOBBIES
Common keywords: hobbies, personal interests, free time, what does he do for fun

- Gaming
- Football
- Trekking
- Nature
- Painting


ISLAND GUIDANCE
Use ONE relevant island at the end of an answer when appropriate.

- About Me topics → About Me island
- Education / graduation → About Me island
- Birthday / personal background → About Me island
- Skills / technologies → Projects & Skills island
- Projects → Projects & Skills island
- AI/ML interests → Projects & Skills island
- Career / professional status / experience → Experience & Journey island
- Hobbies → Home island
- Resume → Contact island
- Contact information → Contact island

Use this format at the end:
"Want to know more? Visit the [Island Name] island."

Do not add island guidance when it would feel unnecessary or when the question is unrelated to Atharv's portfolio.
"""


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def root():
    return {
        "message": "Atharv Portfolio AI backend is running!"
    }


@app.post("/ask")
def ask(request: QuestionRequest):

    prompt = f"""
You are Atharv's portfolio assistant.

Answer questions using ONLY the portfolio information provided below.

Do not invent:
- skills
- experience
- companies
- projects
- achievements
- education
- technologies

If the information is not available, say:
"I don't have that information in Atharv's portfolio."

Keep answers short, natural and professional.

You are speaking to recruiters or visitors of Atharv's portfolio.

When answering a question about Atharv, use the relevant island guidance
provided in the portfolio information.

Never invent information.

If the information is not available, say:
"I don't have that information in Atharv's portfolio."

PORTFOLIO INFORMATION:
{PORTFOLIO_INFO}

VISITOR QUESTION:
{request.question}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return {
        "answer": response.text
    }