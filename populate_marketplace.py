import requests
import json

BASE_URL = "http://localhost:8000/api"
MARKETPLACE_URL = f"{BASE_URL}/marketplace/listings"

# Sample marketplace listings
sample_listings = [
    {
        "name": "Customer Service Agent",
        "description": "Specialized AI agent for handling customer inquiries and support requests. Provides 24/7 response capabilities with natural language understanding.",
        "price": 49.99,
        "author": "Enterprise Solutions Inc.",
        "capabilities": ["customer_service", "text_processing"]
    },
    {
        "name": "Data Analysis Expert",
        "description": "Advanced AI agent that can process, analyze, and visualize complex datasets. Perfect for business intelligence and reporting tasks.",
        "price": 79.99,
        "author": "DataSmart Technologies",
        "capabilities": ["data_analysis", "text_processing"]
    },
    {
        "name": "Coding Assistant",
        "description": "AI agent that helps with programming tasks, code reviews, and debugging. Supports multiple programming languages and frameworks.",
        "price": 99.99,
        "author": "CodeCraft AI",
        "capabilities": ["code_generation", "text_processing"]
    },
    {
        "name": "Process Automation Agent",
        "description": "Automate repetitive business processes and workflows with this versatile AI agent. Easy to configure for various automation tasks.",
        "price": 59.99,
        "author": "Automate Everything Ltd.",
        "capabilities": ["automation", "text_processing"]
    },
    {
        "name": "Full-Stack AI Agent",
        "description": "The ultimate AI staff member with all available capabilities. Can handle a wide range of tasks from customer service to coding.",
        "price": 149.99,
        "author": "AI Staff Solutions",
        "capabilities": ["customer_service", "data_analysis", "code_generation", "automation", "text_processing"]
    }
]

def create_listing(listing_data):
    try:
        response = requests.post(MARKETPLACE_URL, json=listing_data)
        response.raise_for_status()
        print(f"Created listing: {listing_data['name']}")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error creating listing {listing_data['name']}: {e}")
        return None

def main():
    print("Populating marketplace with sample listings...")
    
    for listing in sample_listings:
        create_listing(listing)
    
    print("Done populating marketplace!")

if __name__ == "__main__":
    main()
