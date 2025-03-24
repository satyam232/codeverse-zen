
import React, { useState } from 'react';
import { Play, Download, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeBlock from './CodeBlock';

const sampleCodeMap = {
  typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    
    map.set(nums[i], i);
  }
  
  return [-1, -1]; // No solution found
}`,
  
  python: `def two_sum(nums, target):
    hash_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in hash_map:
            return [hash_map[complement], i]
            
        hash_map[num] = i
        
    return [-1, -1]  # No solution found`,
  
  java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] {map.get(complement), i};
            }
            
            map.put(nums[i], i);
        }
        
        return new int[] {-1, -1}; // No solution found
    }
}`,
  
  cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> hash_map;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (hash_map.find(complement) != hash_map.end()) {
            return {hash_map[complement], i};
        }
        
        hash_map[nums[i]] = i;
    }
    
    return {-1, -1}; // No solution found
}`,
  
  javascript: `function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        
        map.set(nums[i], i);
    }
    
    return [-1, -1]; // No solution found
}`
};

const languageOutputMap = {
  typescript: "✅ Test cases passed: 5/5\n\nFunction successfully returns [0, 1] for input nums = [2, 7, 11, 15], target = 9\n\nExecution time: 3ms\nMemory used: 40.2 MB",
  python: "✅ Test cases passed: 5/5\n\nFunction successfully returns [0, 1] for input nums = [2, 7, 11, 15], target = 9\n\nExecution time: 12ms\nMemory used: 14.1 MB",
  java: "✅ Test cases passed: 5/5\n\nFunction successfully returns [0, 1] for input nums = [2, 7, 11, 15], target = 9\n\nExecution time: 2ms\nMemory used: 39.5 MB",
  cpp: "✅ Test cases passed: 5/5\n\nFunction successfully returns [0, 1] for input nums = [2, 7, 11, 15], target = 9\n\nExecution time: 0ms\nMemory used: 10.8 MB",
  javascript: "✅ Test cases passed: 5/5\n\nFunction successfully returns [0, 1] for input nums = [2, 7, 11, 15], target = 9\n\nExecution time: 4ms\nMemory used: 38.7 MB"
};

const EditorPanel: React.FC = () => {
  const [language, setLanguage] = useState('typescript');
  const [code, setCode] = useState(sampleCodeMap[language as keyof typeof sampleCodeMap]);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(sampleCodeMap[newLanguage as keyof typeof sampleCodeMap] || sampleCodeMap.typescript);
  };

  const handleRunCode = () => {
    setIsLoading(true);
    setOutput('');
    
    // Simulate code execution with a delay
    setTimeout(() => {
      setOutput(languageOutputMap[language as keyof typeof languageOutputMap] || languageOutputMap.typescript);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden bg-card shadow-subtle h-full flex flex-col">
      <div className="bg-secondary/50 border-b border-border/50 p-3 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-medium">Code Editor</h3>
          <div className="ml-4">
            <select 
              value={language} 
              onChange={handleLanguageChange}
              className="text-sm bg-transparent border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handleCopyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <CodeBlock 
          code={code} 
          language={language} 
          animated={false} 
          onChange={handleCodeChange}
        />
      </div>
      
      <div className="border-t border-border/50 p-3 flex items-center justify-between bg-secondary/50">
        <div className="text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-background rounded border border-border text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-background rounded border border-border text-xs">Enter</kbd> to run
        </div>
        <Button onClick={handleRunCode} disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </>
          )}
        </Button>
      </div>
      
      {output && (
        <div className="border-t border-border/50 p-4 bg-editor">
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Output:</h4>
          <pre className="bg-editor-gutter p-4 rounded-md font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default EditorPanel;
