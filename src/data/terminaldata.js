export const terminalCommands = {
  help: [
    "Available commands:",
    "  about     - Developer overview and bio",
    "  skills    - List core technical proficiencies",
    "  projects  - View featured builds",
    "  neofetch  - Display system specs and ASCII logo",
    "  date      - Output current system timestamp",
    "  echo      - Echo given arguments",
    "  clear     - Wipe terminal output",
    "  contact   - Get in touch",
  ],
  banner: `Type 'help' to see available commands or 'neofetch' for system info.`,
};

export const neofetchAscii = `                                                  
                       +++++                      
                    +++++++++++                   
                 +++++++   ++++++                 
                 ++++++     ++++++                
                +++++++     +++++++               
         ++     +++++++     ++++++     +++        
      +++++     +++++++     ++++++     ++++++     
     ++++++     +++++++     ++++++     +++++++    
     +++++++++  +++++++     +++++++  +++++++++    
     ++++++++++++++++++     ++++++++++++++++++    
     ++++++  ++++++++++     ++++++++++ +++++++    
     ++++++     +++++++     +++++++    +++++++    
     ++++++        +++++++++++++       +++++++    
     ++++++           +++++++          +++++++    
     ++++++     ++      ++      +++    +++++++    
     ++++++     +++++         +++++    +++++++    
     ++++++     ++++++      +++++++    +++++++    
     ++++++     +++++++     +++++++    +++++++    
     ++++++     +++++++     +++++++    +++++++    
      +++++     +++++++     ++++++     ++++++     
       ++++     +++++++     +++++++    ++++       
                +++++++     +++++++               
                +++++++     ++++++                
                 ++++++     ++++++                
                   ++++     ++++                  
                                                  `;

export const initialTerminalOutput = [
  { type: "info", text: "Welcome to xCM OS Terminal (v1.0.0-arm64)" },
  { type: "info", text: terminalCommands.banner },
];
